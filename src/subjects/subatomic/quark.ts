import type { Subject } from '../../types/subjects';
import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

function get(): Subject {
  const cube = new THREE.Mesh(geometry, material);

  return cube;
}

export const quark = { get };
