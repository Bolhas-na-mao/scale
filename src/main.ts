import './style.css';
import * as THREE from 'three';
import { quark } from './subjects/subatomic/quark';
import { scale } from './utils.ts/scale';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document
  .querySelector<HTMLDivElement>('#app')!
  .appendChild(renderer.domElement);

const quarkMesh = quark.get();

scene.add(quarkMesh);

function animate() {
  requestAnimationFrame(animate);

  scale.zoom.current += (scale.zoom.target - scale.zoom.current) * 0.1;

  renderer.render(scene, camera);

  quarkMesh.scale.setScalar(scale.zoom.current);
}

animate();
