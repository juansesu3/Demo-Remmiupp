import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const MyThreeComponent = ({ containerWidth, containerHeight, isLoading }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#2a2a2c");
    const camera = new THREE.PerspectiveCamera(
      23,
      containerWidth / containerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(containerWidth, containerHeight);

    camera.position.z = 5;

    const particles = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(1 - Math.random() * 2);
      positions[i] = Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = Math.cos(phi);
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: `${isLoading ? "#FF0000" : "#009aff"}`,
      size: 0.005,
    });
    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    // Initial rotation angles
    let rotationX = 0;
    let rotationY = 0;

    // Handle mouse move event
    const handleMouseMove = (event) => {
      rotationX = (event.clientY / window.innerHeight - 0.5) * Math.PI;
      rotationY = (event.clientX / window.innerWidth - 0.5) * Math.PI;
    };

    // Add mouse move listener
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update the rotation
      particleSystem.rotation.x = 1;
      particleSystem.rotation.y = rotationY;
      particleSystem.rotation.z += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerWidth, containerHeight, isLoading]);

  return <canvas ref={canvasRef} className="rounded-full"></canvas>;
};

export default MyThreeComponent;
