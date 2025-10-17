import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0xf0e68c,
  transparent: true,
});

export const virus = new THREE.Mesh(geometry, material);
