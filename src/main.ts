import './style.css';
import * as THREE from 'three';
import { scale } from './utils.ts/scale';
import { subjects } from './subjects/subject';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  25,
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

const ambientLight = new THREE.AmbientLight(0xffffff, 1);

scene.add(ambientLight);

document
  .querySelector<HTMLDivElement>('#app')!
  .appendChild(renderer.domElement);

scene.add(subjects.current);

function animate() {
  requestAnimationFrame(animate);

  scale.zoom.current += (scale.zoom.target - scale.zoom.current) * 0.1;

  renderer.render(scene, camera);

  if (subjects.current instanceof THREE.Mesh) {
    const material = subjects.current.material as THREE.MeshBasicMaterial;
    material.opacity = Math.min(
      scale.zoom.current / 1.5,
      1 / scale.zoom.current
    );

    subjects.current.rotation.x += 0.001;
    subjects.current.rotation.y += 0.002;
  } else if (subjects.current instanceof THREE.Group) {
    subjects.current.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
        const material = child.material;

        material.opacity = Math.min(
          scale.zoom.current / 1.5,
          1 / scale.zoom.current
        );

        if (index % 2 === 0) {
          child.rotation.x += 0.001;
          child.rotation.y += 0.002;
        } else {
          child.rotation.x -= 0.001;
          child.rotation.y -= 0.002;
        }
      }
    });
  }

  if (scale.zoom.current > 6 && subjects.next) {
    scene.remove(subjects.current);
    scene.add(subjects.next);

    subjects.setNext();

    scale.zoom.current = 0.1;
    scale.zoom.target = 0.1;
  }

  if (scale.zoom.current < 0.1 && subjects.previous) {
    scene.remove(subjects.current);
    scene.add(subjects.previous);

    subjects.setPrevious();

    scale.zoom.current = 6;
    scale.zoom.target = 6;
  }

  subjects.current.scale.setScalar(scale.zoom.current);
}

animate();
