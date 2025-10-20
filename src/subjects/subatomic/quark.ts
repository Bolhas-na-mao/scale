import * as THREE from 'three';

const geometry = new THREE.SphereGeometry(1, 32, 32);

const material = new THREE.PointsMaterial({
  size: 0.02,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.3,
});

const quark1 = new THREE.Points(geometry, material);
const quark2 = new THREE.Points(geometry, material);
const quark3 = new THREE.Points(geometry, material);

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
  opacity: 0.5,
});

const lines = new THREE.Line(lineGeometry, lineMaterial);

const group = new THREE.Group();
group.add(quark1, quark2, quark3, lines);

export const quark = group;
