import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: true,
});

export const nucleus = new THREE.Mesh(geometry, material);
