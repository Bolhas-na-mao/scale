import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0xffc0cb,
  transparent: true,
});

export const satellite = new THREE.Mesh(geometry, material);
