import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0xffd700 });

export const organicMolecule = new THREE.Mesh(geometry, material);
