import * as THREE from 'three';

const points = [
  new THREE.Vector3(-3.0, -3.0, 0),
  new THREE.Vector3(3.0, -3.0, 0),
  new THREE.Vector3(3.0, 3.0, 0),
  new THREE.Vector3(-3.0, 3.0, 0),
];

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const material = new THREE.LineBasicMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const square = new THREE.LineLoop(geometry, material);

square.position.set(-6, 0, 0);
square.rotation.x = -0.2;
square.rotation.y = 0.2;

export { square };
