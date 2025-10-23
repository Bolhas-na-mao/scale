import * as THREE from 'three';
import fragmentShader from '../../shaders/quark/frag.glsl';
import vertexShader from '../../shaders/quark/vert.glsl';

const geometry = new THREE.SphereGeometry(1, 32, 32);

const material1 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0, 0, 1) },
  },
});

const material2 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0, 1, 0) },
  },
});

const material3 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(1, 0, 0) },
  },
});

const quark1 = new THREE.Points(geometry, material1);
const quark2 = new THREE.Points(geometry, material2);
const quark3 = new THREE.Points(geometry, material3);

quark1.position.set(6, 2, 0);
quark2.position.set(3, -1.5, 0);
quark3.position.set(0, 2, 0);

const lineGeometry = new THREE.BufferGeometry().setFromPoints([
  quark1.position,
  quark2.position,
  quark3.position,
  quark1.position,
]);

const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.3,
});

const lines = new THREE.Line(lineGeometry, lineMaterial);

const group = new THREE.Group();
group.add(quark1, quark2, quark3, lines);

function updateLines() {
  const attr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
  attr.setXYZ(0, quark1.position.x, quark1.position.y, quark1.position.z);
  attr.setXYZ(1, quark2.position.x, quark2.position.y, quark2.position.z);
  attr.setXYZ(2, quark3.position.x, quark3.position.y, quark3.position.z);
  attr.setXYZ(3, quark1.position.x, quark1.position.y, quark1.position.z);
  attr.needsUpdate = true;
}

function update(_deltaTime: number, scale: number) {
  quark1.rotation.x += 0.002;
  quark1.rotation.y += 0.003;

  quark2.rotation.x -= 0.002;
  quark2.rotation.y -= 0.003;

  quark3.rotation.x -= 0.003;
  quark3.rotation.y += 0.002;

  updateLines();

  [quark1, quark2, quark3].forEach((quark) => {
    const material = quark.material as THREE.ShaderMaterial;
    material.opacity = Math.min(scale / 1.5, 1 / scale);
  });
}

export const quark = {
  entity: group,
  update,
};
