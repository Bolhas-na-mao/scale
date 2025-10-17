import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0xffdab9,
  transparent: true,
});

export const cell = new THREE.Mesh(geometry, material);
