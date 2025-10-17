import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0xffefd5 });

export const blackHole = new THREE.Mesh(geometry, material);
