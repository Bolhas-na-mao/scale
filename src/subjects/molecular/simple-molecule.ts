import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0xdda0dd });

export const simpleMolecule = new THREE.Mesh(geometry, material);
