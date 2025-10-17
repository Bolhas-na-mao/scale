import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0xadd8e6,
  transparent: true,
});

export const star = new THREE.Mesh(geometry, material);
