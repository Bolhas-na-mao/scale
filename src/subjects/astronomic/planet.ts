import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0xf5deb3,
  transparent: true,
});

export const planet = new THREE.Mesh(geometry, material);
