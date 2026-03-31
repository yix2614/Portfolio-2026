import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RippleShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uScroll;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);

      // Scroll influences the wave origin or intensity
      // When scroll is near 0.5 (half page), max ripple
      float rippleIntensity = smoothstep(0.0, 0.5, uScroll) * (1.0 - smoothstep(0.5, 1.0, uScroll));
      
      // Base ambient wave (always visible)
      float baseWave = sin(dist * 15.0 - uTime * 1.5) * 0.5 + 0.5;
      
      // Scroll wave (stronger, faster)
      float scrollWave = sin(dist * 30.0 - uTime * 4.0) * 0.5 + 0.5;
      
      // Base color: #C3C4C8 -> vec3(0.765, 0.769, 0.784)
      vec3 color1 = vec3(0.765, 0.769, 0.784);
      vec3 color2 = vec3(0.65, 0.66, 0.68); // Darker for better contrast
      
      // Mix based on wave and intensity
      // Base visibility 0.1, plus scroll intensity up to 0.4
      float mixFactor = (baseWave * 0.15) + (scrollWave * rippleIntensity * 0.6);
      
      vec3 finalColor = mix(color1, color2, clamp(mixFactor, 0.0, 1.0));

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

const RipplePlane = ({ scrollY }: { scrollY: React.MutableRefObject<number> }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Normalize scrollY (0 to 1 based on viewport height)
      // Assuming scroll triggers effect when moving from 0 to 1 viewport height
      const normalizedScroll = Math.min(Math.max(scrollY.current / window.innerHeight, 0), 1);
      
      // Lerp scroll value for smooth transition
      material.uniforms.uScroll.value = THREE.MathUtils.lerp(
        material.uniforms.uScroll.value,
        normalizedScroll,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[20, 10, 32, 32]} />
      <shaderMaterial
        vertexShader={RippleShader.vertexShader}
        fragmentShader={RippleShader.fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const RippleBackground = () => {
  const scrollRef = useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <RipplePlane scrollY={scrollRef} />
      </Canvas>
    </div>
  );
};

export default RippleBackground;
