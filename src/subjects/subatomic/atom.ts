import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0x87ceeb,
  transparent: true,
});

export const atom = new THREE.Mesh(geometry, material);
