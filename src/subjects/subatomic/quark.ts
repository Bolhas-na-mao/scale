import * as THREE from 'three';
import fragmentShader from '../../shaders/quark/frag.glsl';
import vertexShader from '../../shaders/quark/vert.glsl';
import { square } from '../../texts/square';

const clock = new THREE.Clock();
const geometry = new THREE.SphereGeometry(1, 32, 32);

const material1 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0.5, 1, 0.5).multiplyScalar(1.6) },
    uTime: { value: 0 },
    uCameraPosition: { value: new THREE.Vector3() },
  },
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const material2 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0.5, 0.5, 1).multiplyScalar(2.6) },
    uTime: { value: 0 },
    uCameraPosition: { value: new THREE.Vector3() },
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
    uCameraPosition: { value: new THREE.Vector3() },
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
  transparent: true,
  depthWrite: false,
  linewidth: 4,
  opacity: 0.7,
  blending: THREE.AdditiveBlending,
});

const lines = new THREE.LineLoop(lineGeometry, lineMaterial);

lines.renderOrder = 1;

const group = new THREE.Group();
group.add(lines, quark1, quark2, quark3, square);

function update(_deltaTime: number, scale: number, camera: THREE.Camera) {
  const elapsedTime = clock.getElapsedTime();

  [quark1, quark2, quark3].forEach((quark) => {
    quark.rotation.x += 0.002;
    quark.rotation.y += 0.003;

    const material = quark.material as THREE.ShaderMaterial;
    material.opacity = Math.min(scale / 1.5, 1 / scale);
    material.uniforms.uTime.value = elapsedTime;
    material.uniforms.uCameraPosition.value.copy(camera.position);
  });
}

export const quark = {
  entity: group,
  update,
};
