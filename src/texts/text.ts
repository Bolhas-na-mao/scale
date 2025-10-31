import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export async function createText({
  text,
}: {
  text: string;
}): Promise<THREE.Mesh> {
  const loader = new FontLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      '/dm_mono_light.json',
      function (font) {
        const geometry = new TextGeometry(text, {
          font,
          size: 0.5,
          depth: 0.1,
          curveSegments: 32,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.01,
          bevelSegments: 5,
        });

        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          blending: THREE.AdditiveBlending,
        });

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(-7, 2, 0);
        mesh.rotation.x = -0.2;
        mesh.rotation.y = 0.2;

        resolve(mesh);
      },
      undefined,
      function (error) {
        reject(error);
      }
    );
  });
}
