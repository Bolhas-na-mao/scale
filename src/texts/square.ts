import * as THREE from 'three';

export function createSquare({
  size = 6,
  position = new THREE.Vector3(0, 0, 0),
  rotation = new THREE.Euler(0, 0, 0),
}: {
  size?: number;
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
} = {}): THREE.LineLoop {
  const halfSize = size / 2;

  const points = [
    new THREE.Vector3(-halfSize, -halfSize, 0),
    new THREE.Vector3(halfSize, -halfSize, 0),
    new THREE.Vector3(halfSize, halfSize, 0),
    new THREE.Vector3(-halfSize, halfSize, 0),
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const square = new THREE.LineLoop(geometry, material);

  square.position.copy(position);
  square.rotation.copy(rotation);

  return square;
}
