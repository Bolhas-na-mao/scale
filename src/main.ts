import './style.css';
import * as THREE from 'three';
import { scale } from './utils.ts/scale';
import { subjects } from './subjects/subject';

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

scene.add(subjects.current);

function animate() {
  requestAnimationFrame(animate);

  scale.zoom.current += (scale.zoom.target - scale.zoom.current) * 0.1;

  renderer.render(scene, camera);

  const material = subjects.current.material as THREE.MeshBasicMaterial;

  material.opacity =
    scale.zoom.current < 1 ? scale.zoom.current * 0.67 : 1 / scale.zoom.current;

  if (scale.zoom.current > 6 && subjects.next) {
    scene.remove(subjects.current);
    scene.add(subjects.next);

    subjects.setNext();

    scale.zoom.current = 0.1;
    scale.zoom.target = 0;
  }

  if (scale.zoom.current < 0.1 && subjects.previous) {
    scene.remove(subjects.current);
    scene.add(subjects.previous);

    subjects.setPrevious();

    scale.zoom.current = 6;
    scale.zoom.target = 0;
  }

  subjects.current.scale.setScalar(scale.zoom.current);
}

animate();
