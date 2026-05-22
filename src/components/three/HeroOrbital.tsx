import { useEffect, useMemo, useRef, useState } from "react";

type ThreeMods = {
  three: typeof import("three");
  fiber: typeof import("@react-three/fiber");
  drei: typeof import("@react-three/drei");
};

function Scene({ mods }: { mods: ThreeMods }) {
  const { three: THREE, fiber, drei } = mods;
  const { useFrame } = fiber;
  const { Float } = drei;

  const SovereignNode = () => {
    const ref = useRef<any>(null);
    useFrame((_, dt) => {
      if (ref.current) ref.current.rotation.y += dt * 0.15;
    });
    return (
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial
            color="#D4AF37"
            wireframe
            emissive="#D4AF37"
            emissiveIntensity={0.6}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#1a2540"
            emissive="#D4AF37"
            emissiveIntensity={0.35}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <pointLight color="#D4AF37" intensity={3} distance={6} />
      </group>
    );
  };

  function Ring({ radius, tilt, speed, nodes, color }: { radius: number; tilt: [number, number, number]; speed: number; nodes: number; color: string }) {
    const ref = useRef<any>(null);
    useFrame((_, dt) => {
      if (ref.current) ref.current.rotation.z += dt * speed;
    });
    const ringPoints = useMemo(() => {
      const pts: any[] = [];
      const seg = 128;
      for (let i = 0; i <= seg; i++) {
        const a = (i / seg) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
      }
      return pts;
    }, [radius]);
    const lineGeom = useMemo(() => new THREE.BufferGeometry().setFromPoints(ringPoints), [ringPoints]);
    const nodeAngles = useMemo(() => Array.from({ length: nodes }, (_, i) => (i / nodes) * Math.PI * 2), [nodes]);

    return (
      <group ref={ref} rotation={tilt}>
        <primitive object={new THREE.Line(lineGeom, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 }))} />
        {nodeAngles.map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1.4} />
          </mesh>
        ))}
      </group>
    );
  }

  function Particles({ count = 600 }: { count?: number }) {
    const positions = useMemo(() => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 4;
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(2 * Math.random() - 1);
        arr[i * 3 + 0] = r * Math.sin(p) * Math.cos(t);
        arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
        arr[i * 3 + 2] = r * Math.cos(p);
      }
      return arr;
    }, [count]);
    const ref = useRef<any>(null);
    useFrame((_, dt) => {
      if (ref.current) ref.current.rotation.y += dt * 0.04;
    });
    return (
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.025} color="#3b82f6" sizeAttenuation transparent opacity={0.55} />
      </points>
    );
  }

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#D4AF37" />
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <SovereignNode />
      </Float>
      <Ring radius={1.6} tilt={[Math.PI / 2.4, 0, 0]} speed={0.18} nodes={6} color="#D4AF37" />
      <Ring radius={2.3} tilt={[Math.PI / 1.8, Math.PI / 5, 0]} speed={-0.12} nodes={8} color="#3b82f6" />
      <Ring radius={3.0} tilt={[Math.PI / 3, -Math.PI / 4, 0]} speed={0.08} nodes={12} color="#D4AF37" />
      <Particles count={500} />
    </>
  );
}

export default function HeroOrbital() {
  const [mods, setMods] = useState<ThreeMods | null>(null);

  useEffect(() => {
    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    Promise.all([
      import("three"),
      import("@react-three/fiber"),
      import("@react-three/drei"),
    ]).then(([three, fiber, drei]) => {
      if (!cancelled) setMods({ three, fiber, drei });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!mods) {
    return (
      <div className="relative h-full w-full">
        <div
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-pulse-glow"
          style={{ background: "rgba(212,175,55,0.25)" }}
        />
      </div>
    );
  }

  const { fiber } = mods;
  const Canvas = fiber.Canvas;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene mods={mods} />
    </Canvas>
  );
}