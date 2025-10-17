import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0xfffacd });

export const cluster = new THREE.Mesh(geometry, material);
