import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, SpotLight, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Truss building blocks ---------- */

function TrussBeam({ length = 6, ...props }) {
  // 4 chords + vertical braces forming a square box truss along local X
  const seg = 0.36;
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
          <boxGeometry args={[length, 0.045, 0.045]} />
          <meshStandardMaterial color="#3a3a3e" metalness={0.9} roughness={0.35} />
        </mesh>
      ))}
      {braces.map((x, i) => (
        <group key={`b${i}`} position={[x, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.035, 0.24, 0.035]} />
            <meshStandardMaterial color="#2c2c30" metalness={0.85} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.035, 0.24, 0.035]} />
            <meshStandardMaterial color="#2c2c30" metalness={0.85} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Tower({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[0.28, 8, 0.28]} />
        <meshStandardMaterial color="#222226" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.9, 0.2, 0.9]} />
        <meshStandardMaterial color="#161618" metalness={0.7} roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ---------- A single moving stage light mounted on the rig ---------- */

function MovingHead({ position, color, lightsOn, beatRef, phase = 0 }) {
  const yoke = useRef();
  const spot = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (yoke.current) {
      yoke.current.rotation.z = Math.sin(t * 0.8 + phase) * 0.5;
      yoke.current.rotation.x = Math.cos(t * 0.6 + phase) * 0.35;
    }
    if (spot.current) {
      const beat = beatRef.current;
      spot.current.intensity = lightsOn ? (40 + beat * 120) : 0;
    }
  });
  return (
    <group position={position}>
      {/* clamp + fixture body */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.18, 0.18, 0.18]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.6} />
      </mesh>
      <group ref={yoke}>
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.12, 0.16, 0.28, 16]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* glowing lens */}
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.04, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={lightsOn ? 3 : 0}
            toneMapped={false}
          />
        </mesh>
        <SpotLight
          ref={spot}
          position={[0, -0.24, 0]}
          color={color}
          distance={22}
          angle={0.5}
          attenuation={16}
          anglePower={4}
          penumbra={1}
          intensity={lightsOn ? 60 : 0}
          opacity={lightsOn ? 0.45 : 0}
          radiusTop={0.05}
          radiusBottom={2.2}
          volumetric
        />
      </group>
    </group>
  );
}

/* ---------- The overhead rig (raises / lowers) ---------- */

function Rig({ trussHeight, lightsOn, beatRef }) {
  const group = useRef();
  useFrame(() => {
    if (group.current) {
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        trussHeight,
        0.08
      );
    }
  });

  const W = 11; // width along X
  const D = 6; // depth along Z
  const heads = [
    { x: -3.6, z: -2.4, c: "#22d3ee" },
    { x: 0, z: -2.4, c: "#ffffff" },
    { x: 3.6, z: -2.4, c: "#e879f9" },
    { x: -3.6, z: 2.4, c: "#e879f9" },
    { x: 0, z: 2.4, c: "#facc15" },
    { x: 3.6, z: 2.4, c: "#22d3ee" },
  ];

  return (
    <group ref={group} position={[0, 7, 0]}>
      {/* front & back trusses (along X) */}
      <TrussBeam length={W} position={[0, 0, -D / 2]} />
      <TrussBeam length={W} position={[0, 0, D / 2]} />
      {/* side trusses (along Z) */}
      <TrussBeam length={D} position={[-W / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <TrussBeam length={D} position={[W / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />

      {heads.map((h, i) => (
        <MovingHead
          key={i}
          position={[h.x, -0.2, h.z]}
          color={h.c}
          lightsOn={lightsOn}
          beatRef={beatRef}
          phase={i * 1.3}
        />
      ))}
    </group>
  );
}

/* ---------- Floor + LED back wall ---------- */

function StageFloor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0c0c0d" metalness={0.6} roughness={0.25} />
      </mesh>
      {/* raised performance deck */}
      <mesh position={[0, 0.25, -1]}>
        <boxGeometry args={[12, 0.5, 7]} />
        <meshStandardMaterial color="#161618" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* LED back wall */}
      <mesh position={[0, 4, -5]}>
        <planeGeometry args={[13, 7]} />
        <meshStandardMaterial
          color="#08080a"
          emissive="#0e1a24"
          emissiveIntensity={0.6}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
    </>
  );
}

/* ---------- Haze particles ---------- */

function Haze() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = Math.random() * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#9fb3c8" size={0.06} transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

/* ---------- Beat driver (fake audio pulse) ---------- */

function BeatDriver({ beatRef, active }) {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // layered sine "beat" 0..1
    const b = Math.max(0, Math.sin(t * 4.2) * 0.6 + Math.sin(t * 8.1) * 0.4);
    beatRef.current = active ? b : 0;
  });
  return null;
}

/* ---------- Main exported scene ---------- */

export default function StageScene({ trussHeight, lightsOn, beatActive }) {
  const beatRef = useRef(0);
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      <fogExp2 attach="fog" args={["#0a0a0a", 0.035]} />

      <PerspectiveCamera makeDefault position={[0, 3.2, 14]} fov={50} />
      <OrbitControls
        enablePan={false}
        minDistance={7}
        maxDistance={22}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2 - 0.05}
        autoRotate
        autoRotateSpeed={0.4}
        target={[0, 2.5, 0]}
      />

      <ambientLight intensity={0.12} color="#ffffff" />
      <hemisphereLight args={["#1b2735", "#000000", 0.15]} />

      <BeatDriver beatRef={beatRef} active={beatActive} />

      <StageFloor />
      <Rig trussHeight={trussHeight} lightsOn={lightsOn} beatRef={beatRef} />

      <Tower position={[-5.5, 0, -3]} />
      <Tower position={[5.5, 0, -3]} />
      <Tower position={[-5.5, 0, 3]} />
      <Tower position={[5.5, 0, 3]} />

      <Haze />
    </Canvas>
  );
}
