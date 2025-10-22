import * as THREE from 'three';
import vertexShader from '../../shaders/quark/vert.glsl';
import fragmentShader from '../../shaders/quark/frag.glsl';

const geometry = new THREE.SphereGeometry(1, 32, 32);

const material1 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0x0000ff) },
  },
});
const material2 = new THREE.ShaderMaterial({ vertexShader, fragmentShader });
const material3 = new THREE.ShaderMaterial({ vertexShader, fragmentShader });

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

export function updateLines() {
  const positions = lineGeometry.attributes.position.array as Float32Array;
  positions[0] = quark1.position.x;
  positions[1] = quark1.position.y;
  positions[2] = quark1.position.z;
  positions[3] = quark2.position.x;
  positions[4] = quark2.position.y;
  positions[5] = quark2.position.z;
  positions[6] = quark3.position.x;
  positions[7] = quark3.position.y;
  positions[8] = quark3.position.z;
  positions[9] = quark1.position.x;
  positions[10] = quark1.position.y;
  positions[11] = quark1.position.z;
  lineGeometry.attributes.position.needsUpdate = true;
}

export const quark = group;
