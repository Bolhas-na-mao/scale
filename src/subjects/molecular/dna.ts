import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0xffb6c1,
  transparent: true,
});

export const dna = new THREE.Mesh(geometry, material);
