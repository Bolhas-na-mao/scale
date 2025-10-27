import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import './style.css';
import { subjects } from './subjects/subject';
import { scale } from './utils.ts/scale';

const scene = new THREE.Scene();

const canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 256;

const ctx = canvas.getContext('2d');

if (ctx) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, 'oklch(0.14 0.03 282)');
  gradient.addColorStop(1, 'oklch(0.10 0.05 268)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
}

scene.background = new THREE.CanvasTexture(canvas);

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

camera.position.z = 23;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  1.2
);

composer.addPass(bloomPass);

const smaaPass = new SMAAPass();
composer.addPass(smaaPass);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

document
  .querySelector<HTMLDivElement>('#app')!
  .appendChild(renderer.domElement);

scene.add(subjects.current.entity);

let lastTime = 0;

function animate(time: number) {
  requestAnimationFrame(animate);

  const deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  scale.zoom.current += (scale.zoom.target - scale.zoom.current) * 0.1;

  subjects.current.update?.(deltaTime, scale.zoom.current, camera);

  if (scale.zoom.current > 6 && subjects.next) {
    subjects.current.onExit?.();
    scene.remove(subjects.current.entity);

    subjects.setNext();
    scene.add(subjects.current.entity);
    subjects.current.onEnter?.();

    scale.zoom.current = 0.1;
    scale.zoom.target = 0.1;
  }

  if (scale.zoom.current < 0.1 && subjects.previous) {
    subjects.current.onExit?.();
    scene.remove(subjects.current.entity);

    subjects.setPrevious();
    scene.add(subjects.current.entity);
    subjects.current.onEnter?.();

    scale.zoom.current = 6;
    scale.zoom.target = 6;
  }

  subjects.current.entity.scale.setScalar(scale.zoom.current);

  composer.render();
}

animate(0);
