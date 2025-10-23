import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0xfaf0e6,
  transparent: true,
});

const entity = new THREE.Mesh(geometry, material);

export const universe = { entity };
