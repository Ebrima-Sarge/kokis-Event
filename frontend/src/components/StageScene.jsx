import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import * as THREE from "three";

const BLUES = ["#3b82f6", "#60a5fa", "#22d3ee", "#818cf8"];

/* ---------- Truss building blocks ---------- */
function TrussBeam({ length = 6, ...props }) {
  const seg = 0.4;
  const count = Math.max(2, Math.floor(length / seg));
  const braces = useMemo(
    () => new Array(count).fill(0).map((_, i) => -length / 2 + (i / (count - 1)) * length),
    [count, length]
  );
  const chord = [
    [0.12, 0.12],
    [0.12, -0.12],
    [-0.12, 0.12],
    [-0.12, -0.12],
  ];
  return (
    <group {...props}>
      {chord.map(([y, z], i) => (
        <mesh key={i} position={[0, y, z]}>
          <boxGeometry args={[length, 0.05, 0.05]} />
          <meshStandardMaterial color="#52525b" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      {braces.map((x, i) => (
        <group key={`b${i}`} position={[x, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.035, 0.24, 0.035]} />
            <meshStandardMaterial color="#3f3f46" metalness={0.85} roughness={0.4} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.035, 0.24, 0.035]} />
            <meshStandardMaterial color="#3f3f46" metalness={0.85} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- Vertical tower ---------- */
function Tower({ x, height = 9 }) {
  return (
    <group position={[x, 0, 1.5]}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[0.3, height, 0.3]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color="#18181b" metalness={0.6} roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ---------- Line-array speaker stack hung on a tower ---------- */
function LineArray({ x }) {
  const boxes = new Array(7).fill(0);
  return (
    <group position={[x, 0, 1.5]}>
      {boxes.map((_, i) => (
        <mesh key={i} position={[0, 7.4 - i * 0.62, 0]} rotation={[i * 0.04, 0, 0]}>
          <boxGeometry args={[1.1, 0.55, 0.7]} />
          <meshStandardMaterial color="#0d0d0f" metalness={0.5} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- A moving head with a volumetric beam ---------- */
function MovingHead({ position, color, beatRef, phase }) {
  const yoke = useRef();
  const spot = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (yoke.current) {
      yoke.current.rotation.x = -0.35 + Math.sin(t * 0.6 + phase) * 0.28;
      yoke.current.rotation.z = Math.sin(t * 0.9 + phase) * 0.22;
    }
    if (spot.current) spot.current.intensity = 80 + beatRef.current * 160;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.2, 0.14, 0.2]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.6} />
      </mesh>
      <group ref={yoke}>
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.14, 0.18, 0.3, 18]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.24, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 18]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} toneMapped={false} />
        </mesh>
        <SpotLight
          ref={spot}
          position={[0, -0.26, 0]}
          color={color}
          distance={26}
          angle={0.42}
          attenuation={20}
          anglePower={4}
          penumbra={1}
          intensity={120}
          opacity={0.5}
          radiusTop={0.06}
          radiusBottom={2.6}
          volumetric
        />
      </group>
    </group>
  );
}

/* ---------- Overhead rig with the front beam row ---------- */
function Rig({ beatRef }) {
  const W = 12;
  const heads = useMemo(
    () => new Array(11).fill(0).map((_, i) => ({
      x: -W / 2 + 0.6 + (i / 10) * (W - 1.2),
      c: BLUES[i % BLUES.length],
    })),
    []
  );
  return (
    <group position={[0, 7.6, 0]}>
      <TrussBeam length={W} position={[0, 0, -3]} />
      <TrussBeam length={W} position={[0, 0, 0.2]} />
      <TrussBeam length={6.4} position={[-W / 2, 0, -1.4]} rotation={[0, Math.PI / 2, 0]} />
      <TrussBeam length={6.4} position={[W / 2, 0, -1.4]} rotation={[0, Math.PI / 2, 0]} />
      {heads.map((h, i) => (
        <MovingHead key={i} position={[h.x, -0.3, 0.2]} color={h.c} beatRef={beatRef} phase={i * 0.7} />
      ))}
    </group>
  );
}

/* ---------- LED video wall (animated emissive) ---------- */
function LedWall({ beatRef }) {
  const panels = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    panels.current.forEach((m, i) => {
      if (!m) return;
      const v = 0.5 + Math.abs(Math.sin(t * 1.5 + i * 0.5)) * (0.9 + beatRef.current * 1.4);
      m.material.emissiveIntensity = v;
    });
  });
  const cols = 5;
  return (
    <group position={[0, 4.4, -4.6]}>
      {new Array(cols).fill(0).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (panels.current[i] = el)}
          position={[-((cols - 1) / 2) * 2.05 + i * 2.05, 0, 0]}
        >
          <planeGeometry args={[1.95, 8]} />
          <meshStandardMaterial
            color="#020208"
            emissive={i % 2 === 0 ? "#1d4ed8" : "#2563eb"}
            emissiveIntensity={1.0}
            metalness={0.2}
            roughness={0.7}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Stage decks, stairs, DJ booth & subs ---------- */
function StageBuild() {
  const mat = <meshStandardMaterial color="#161618" metalness={0.4} roughness={0.6} />;
  const ledStrip = (
    <meshStandardMaterial color="#bfdbfe" emissive="#60a5fa" emissiveIntensity={3} toneMapped={false} />
  );
  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* main back deck */}
      <mesh position={[0, 0.4, -3]}>
        <boxGeometry args={[13, 0.8, 4]} />
        {mat}
      </mesh>
      {/* side wings */}
      <mesh position={[-5, 0.9, -1.5]}>
        <boxGeometry args={[3, 1.8, 3]} />
        {mat}
      </mesh>
      <mesh position={[5, 0.9, -1.5]}>
        <boxGeometry args={[3, 1.8, 3]} />
        {mat}
      </mesh>
      {/* center thrust */}
      <mesh position={[0, 0.3, 1.5]}>
        <boxGeometry args={[3.4, 0.6, 5]} />
        {mat}
      </mesh>
      {/* deck LED edges */}
      <mesh position={[0, 0.82, -1]}>
        <boxGeometry args={[13, 0.06, 0.06]} />
        {ledStrip}
      </mesh>
      <mesh position={[0, 0.62, 4]}>
        <boxGeometry args={[3.4, 0.06, 0.06]} />
        {ledStrip}
      </mesh>
      {/* DJ booth */}
      <mesh position={[0, 1.0, -1.6]}>
        <boxGeometry args={[2.6, 0.5, 0.9]} />
        <meshStandardMaterial color="#0d0d10" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.28, -1.6]}>
        <boxGeometry args={[2.62, 0.04, 0.92]} />
        {ledStrip}
      </mesh>
      {/* front subwoofer row */}
      {new Array(12).fill(0).map((_, i) => (
        <mesh key={i} position={[-7 + i * 1.27, 0.45, 6.2]}>
          <boxGeometry args={[1.05, 0.9, 1.1]} />
          <meshStandardMaterial color="#0c0c0e" metalness={0.5} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Haze ---------- */
function Haze() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = Math.random() * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#93c5fd" size={0.05} transparent opacity={0.22} sizeAttenuation />
    </points>
  );
}

/* ---------- Beat driver ---------- */
function BeatDriver({ beatRef }) {
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    beatRef.current = Math.max(0, Math.sin(t * 4.4) * 0.6 + Math.sin(t * 8.2) * 0.4);
  });
  return null;
}

/* ---------- Scroll-driven cinematic camera ---------- */
function CameraRig({ scrollRef }) {
  const cam = useThree((s) => s.camera);
  const A = useMemo(() => ({ pos: new THREE.Vector3(0, 9.5, 23), tgt: new THREE.Vector3(0, 3.8, -2) }), []);
  const B = useMemo(() => ({ pos: new THREE.Vector3(7.5, 2.2, 11.5), tgt: new THREE.Vector3(0, 3, -3) }), []);
  const tp = useMemo(() => new THREE.Vector3(), []);
  const tt = useMemo(() => new THREE.Vector3(), []);
  useFrame((state) => {
    const p = THREE.MathUtils.clamp(scrollRef.current, 0, 1);
    const e = p * p * (3 - 2 * p);
    const t = state.clock.elapsedTime;
    tp.lerpVectors(A.pos, B.pos, e);
    tp.x += Math.sin(t * 0.18) * 0.5 * (1 - e * 0.5);
    tp.y += Math.sin(t * 0.22) * 0.18;
    tt.lerpVectors(A.tgt, B.tgt, e);
    cam.position.lerp(tp, 0.08);
    cam.lookAt(tt);
  });
  return null;
}

/* ---------- Main scene ---------- */
export default function StageScene({ scrollRef }) {
  const beatRef = useRef(0);
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 9.5, 23], fov: 46 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
      }}
    >
      <color attach="background" args={["#070709"]} />
      <fogExp2 attach="fog" args={["#070709", 0.028]} />

      <CameraRig scrollRef={scrollRef} />
      <BeatDriver beatRef={beatRef} />

      <ambientLight intensity={0.14} color="#dbeafe" />
      <hemisphereLight args={["#1e293b", "#000000", 0.2]} />
      <directionalLight position={[0, 12, 8]} intensity={0.15} color="#93c5fd" />

      <StageBuild />
      <LedWall beatRef={beatRef} />
      <Rig beatRef={beatRef} />

      <Tower x={-6.4} />
      <Tower x={6.4} />
      <LineArray x={-8.2} />
      <LineArray x={8.2} />

      <Haze />
    </Canvas>
  );
}
