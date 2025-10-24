import * as THREE from 'three';
import fragmentShader from '../../shaders/quark/frag.glsl';
import vertexShader from '../../shaders/quark/vert.glsl';

const clock = new THREE.Clock();
const geometry = new THREE.SphereGeometry(1, 32, 32);

const material1 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0.5, 1, 0.5).multiplyScalar(1.3) },
    uTime: { value: 0 },
  },
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const material2 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0.5, 0.5, 1).multiplyScalar(2.0) },
    uTime: { value: 0 },
  },
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const material3 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(1, 0.5, 0.5).multiplyScalar(2.2) },
    uTime: { value: 0 },
  },
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const quark1 = new THREE.Mesh(geometry, material1);
const quark2 = new THREE.Mesh(geometry, material2);
const quark3 = new THREE.Mesh(geometry, material3);

quark1.position.set(6, 2, 0);
quark2.position.set(3, -1.5, 0);
quark3.position.set(0, 2, 0);

const lineGeometry = new THREE.BufferGeometry().setFromPoints([
  quark1.position,
  quark2.position,
  quark3.position,
]);

const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.3,
  depthWrite: false,
});

const lines = new THREE.LineLoop(lineGeometry, lineMaterial);

const group = new THREE.Group();
group.add(quark1, quark2, quark3, lines);

function update(_deltaTime: number, scale: number) {
  const elapsedTime = clock.getElapsedTime();
  quark1.rotation.x += 0.002;
  quark1.rotation.y += 0.003;

  quark2.rotation.x -= 0.002;
  quark2.rotation.y -= 0.003;

  quark3.rotation.x -= 0.003;
  quark3.rotation.y += 0.002;

  [quark1, quark2, quark3].forEach((quark) => {
    const material = quark.material as THREE.ShaderMaterial;
    material.opacity = Math.min(scale / 1.5, 1 / scale);
    material.uniforms.uTime.value = elapsedTime;
  });
}

export const quark = {
  entity: group,
  update,
};
