"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const NODES = [
  { lat: 40.7, lon: -74, label: "NYC" },
  { lat: 51.5, lon: -0.12, label: "LON" },
  { lat: 35.68, lon: 139.69, label: "TYO" },
  { lat: 1.35, lon: 103.81, label: "SIN" },
  { lat: -33.86, lon: 151.2, label: "SYD" },
  { lat: 52.52, lon: 13.4, label: "BER" },
  { lat: 37.77, lon: -122.4, label: "SFO" },
  { lat: 19.07, lon: 72.87, label: "MUM" },
  { lat: -23.55, lon: -46.63, label: "SAO" },
  { lat: 55.75, lon: 37.6, label: "MOW" },
];

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -r * Math.sin(phi) * Math.cos(theta);
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function Globe() {
  const groupRef = useRef<THREE.Group | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);

  // Dotted globe surface
  const dotsGeometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const r = 2;
    for (let lat = -90; lat <= 90; lat += 4) {
      const ring = Math.max(4, Math.round(80 * Math.cos((lat * Math.PI) / 180)));
      for (let i = 0; i < ring; i++) {
        const lon = (i / ring) * 360 - 180;
        const v = latLonToVec3(lat, lon, r);
        positions.push(v.x, v.y, v.z);
        const c = new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3);
        colors.push(c.r, c.g, c.b);
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geom;
  }, []);

  const nodePositions = useMemo(
    () => NODES.map((n) => latLonToVec3(n.lat, n.lon, 2.05)),
    []
  );

  // Connection arcs
  const arcs = useMemo(() => {
    const out: { curve: THREE.QuadraticBezierCurve3; hue: number }[] = [];
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        if (Math.random() > 0.45) continue;
        const a = nodePositions[i];
        const b = nodePositions[j];
        const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(3.2);
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        out.push({ curve, hue: Math.random() });
      }
    }
    return out;
  }, [nodePositions]);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.08;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={dotsGeometry}>
        <pointsMaterial size={0.025} vertexColors transparent opacity={0.85} />
      </points>

      {/* Subtle sphere */}
      <mesh>
        <sphereGeometry args={[1.98, 64, 64]} />
        <meshBasicMaterial color="#0a1a2f" transparent opacity={0.4} />
      </mesh>

      {/* Nodes */}
      {nodePositions.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#22d3ee" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} />
          </mesh>
        </group>
      ))}

      {/* Arcs */}
      {arcs.map((a, i) => (
        <Arc key={i} curve={a.curve} index={i} />
      ))}
    </group>
  );
}

function Arc({ curve, index }: { curve: THREE.QuadraticBezierCurve3; index: number }) {
  const lineRef = useRef<THREE.Line | null>(null);
  const packetRef = useRef<THREE.Mesh | null>(null);
  const points = useMemo(() => curve.getPoints(40), [curve]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useFrame((state) => {
    if (packetRef.current) {
      const t = ((state.clock.elapsedTime * 0.4 + index * 0.13) % 1);
      const v = curve.getPointAt(t);
      packetRef.current.position.copy(v);
    }
  });

  return (
    <group>
      <primitive
        object={new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ color: index % 2 ? "#a855f7" : "#22d3ee", transparent: true, opacity: 0.35 })
        )}
        ref={lineRef as any}
      />
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={index % 2 ? "#ec4899" : "#00ffe1"} />
      </mesh>
    </group>
  );
}

export default function GlobeNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 3, 5]} intensity={1} color="#22d3ee" />
      <Globe />
    </Canvas>
  );
}
