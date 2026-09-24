"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface SystemNode {
  name: string;
  category: string;
  position: THREE.Vector3;
  targetPosition: THREE.Vector3;
  mesh?: THREE.Mesh;
  glow?: THREE.Mesh;
  color: number;
}

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNodeName, setActiveNodeName] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check device capability
    const isMobile = window.innerWidth < 768;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Engineering Nodes Definition
    const nodesData: { name: string; category: string; pos: [number, number, number]; color: number }[] = [
      { name: "Frontend", category: "React / Native", pos: [-2.6, 1.4, 0.2], color: 0x38bdf8 },
      { name: "Backend", category: "Node / Express / Socket", pos: [0, 1.8, -0.4], color: 0x818cf8 },
      { name: "Database", category: "Postgres / Mongo / Prisma", pos: [2.5, 0.8, 0.3], color: 0x34d399 },
      { name: "Cloud & Infra", category: "AWS / Docker / VPS", pos: [1.8, -1.5, -0.2], color: 0x38bdf8 },
      { name: "Algorithms", category: "Graphs / DP / Trees", pos: [-2.0, -1.4, 0.4], color: 0xa78bfa },
    ];

    const nodes: SystemNode[] = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    // Create geometries and materials
    const sphereGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const ringGeo = new THREE.RingGeometry(0.38, 0.44, 32);

    nodesData.forEach((d) => {
      // Main node core
      const mat = new THREE.MeshBasicMaterial({
        color: d.color,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(...d.pos);

      // Inner glowing core
      const innerGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      mesh.add(innerMesh);

      // Subtle orbiting ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: d.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      mesh.add(ringMesh);

      nodeGroup.add(mesh);

      nodes.push({
        name: d.name,
        category: d.category,
        position: new THREE.Vector3(...d.pos),
        targetPosition: new THREE.Vector3(...d.pos),
        mesh,
        glow: ringMesh,
        color: d.color,
      });
    });

    // Create Interconnecting Edges
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
    });

    const connections: [number, number][] = [
      [0, 1], // Frontend -> Backend
      [1, 2], // Backend -> Database
      [1, 3], // Backend -> Cloud
      [2, 3], // Database -> Cloud
      [0, 4], // Frontend -> Algorithms
      [1, 4], // Backend -> Algorithms
      [3, 4], // Cloud -> Algorithms
    ];

    const lines: THREE.Line[] = [];
    connections.forEach(([i, j]) => {
      const p1 = nodes[i].position;
      const p2 = nodes[j].position;
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const line = new THREE.Line(geo, lineMat);
      nodeGroup.add(line);
      lines.push(line);
    });

    // Data packets (particles traveling along lines)
    const packetCount = connections.length * 2;
    const packetGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    const packets: { mesh: THREE.Mesh; lineIdx: number; progress: number; speed: number }[] = [];
    for (let k = 0; k < packetCount; k++) {
      const pMesh = new THREE.Mesh(packetGeo, packetMat);
      nodeGroup.add(pMesh);
      packets.push({
        mesh: pMesh,
        lineIdx: k % connections.length,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
      });
    }

    // Interactive mouse / tilt tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isIntersecting = true;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = x * 0.35;
      targetRotationX = -y * 0.25;

      // Raycasting for node hover
      const mouse = new THREE.Vector2(x, y);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const meshes = nodes.map((n) => n.mesh!).filter(Boolean);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hit = nodes.find((n) => n.mesh === intersects[0].object);
        if (hit) setActiveNodeName(hit.name);
      } else {
        setActiveNodeName(null);
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // IntersectionObserver to pause when not visible
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    });
    observer.observe(container);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isIntersecting) return;

      const elapsed = clock.getElapsedTime();

      // Smooth camera/group tilt
      nodeGroup.rotation.y += (targetRotationY - nodeGroup.rotation.y) * 0.05;
      nodeGroup.rotation.x += (targetRotationX - nodeGroup.rotation.x) * 0.05;

      // Base idle oscillation
      nodeGroup.position.y = Math.sin(elapsed * 0.8) * 0.12;

      // Node individual subtle pulse & ring rotations
      nodes.forEach((n, idx) => {
        if (n.mesh) {
          n.mesh.position.y = n.position.y + Math.sin(elapsed * 1.5 + idx) * 0.08;
          n.mesh.rotation.y += 0.008;
        }
        if (n.glow) {
          n.glow.rotation.z += 0.015;
        }
      });

      // Update line connections to match floating node positions
      connections.forEach(([i, j], idx) => {
        const line = lines[idx];
        if (line && nodes[i].mesh && nodes[j].mesh) {
          const posAttr = line.geometry.attributes.position;
          posAttr.setXYZ(0, nodes[i].mesh!.position.x, nodes[i].mesh!.position.y, nodes[i].mesh!.position.z);
          posAttr.setXYZ(1, nodes[j].mesh!.position.x, nodes[j].mesh!.position.y, nodes[j].mesh!.position.z);
          posAttr.needsUpdate = true;
        }
      });

      // Update data packets traveling along lines
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) pkt.progress = 0;

        const [startIdx, endIdx] = connections[pkt.lineIdx];
        const startNode = nodes[startIdx].mesh;
        const endNode = nodes[endIdx].mesh;

        if (startNode && endNode) {
          pkt.mesh.position.lerpVectors(startNode.position, endNode.position, pkt.progress);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      sphereGeo.dispose();
      ringGeo.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] flex items-center justify-center select-none"
      aria-label="Interactive 3D Engineering Architecture Visualization"
    >
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating System Architecture Badges */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
        {/* Top left badge */}
        <div className="flex items-center gap-2 bg-[#0c0e14]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg w-fit text-[11px] font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>REAL-TIME SYSTEM ARCHITECTURE</span>
        </div>

        {/* Bottom hover status badge */}
        <div className="self-end bg-[#0c0e14]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-400">
          {activeNodeName ? (
            <span className="text-sky-300 font-semibold">Active Node: {activeNodeName}</span>
          ) : (
            <span className="text-slate-500">Interactive WebGL Mesh • 60 FPS</span>
          )}
        </div>
      </div>
    </div>
  );
}
