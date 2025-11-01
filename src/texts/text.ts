import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js';

export async function createText({
  text,
  fontSize = 0.5,
  position = new THREE.Vector3(0, 0, 0),
  rotation = new THREE.Euler(0, 0, 0),
}: {
  text: string;
  fontSize?: number;
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
}): Promise<THREE.Mesh> {
  const loader = new FontLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      '/dm_mono_light.json',
      function (font) {
        const geometry = new TextGeometry(text, {
          font,
          size: fontSize,
          depth: 0,
          curveSegments: 32,
          bevelEnabled: true,
          bevelThickness: 0,
          bevelSize: 0.01,
          bevelSegments: 5,
        });

        geometry.computeBoundingBox();
        const boundingBox = geometry.boundingBox!;

        const centerX =
          (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x;
        const topY = boundingBox.max.y;
        const centerZ =
          (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z;

        geometry.translate(-centerX, -topY, -centerZ);

        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.copy(position);
        mesh.rotation.copy(rotation);

        resolve(mesh);
      },
      undefined,
      function (error) {
        reject(error);
      }
    );
  });
}

/**
 * Mede a largura do texto com a fonte e tamanho fornecidos
 */
function measureTextWidth(text: string, font: Font, fontSize: number): number {
  const geometry = new TextGeometry(text, {
    font,
    size: fontSize,
    depth: 0.1,
    curveSegments: 32,
  });

  geometry.computeBoundingBox();
  const boundingBox = geometry.boundingBox!;
  const width = boundingBox.max.x - boundingBox.min.x;

  geometry.dispose();

  return width;
}

/**
 * Quebra o texto em linhas que cabem dentro de maxWidth
 */
function breakTextIntoLines(
  text: string,
  font: Font,
  fontSize: number,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = measureTextWidth(testLine, font, fontSize);

    if (width > maxWidth && currentLine) {
      // Linha atual está cheia, inicia uma nova linha
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Cria texto que cabe dentro de uma largura máxima
 */
export async function createMultiLineText({
  text,
  fontSize = 0.5,
  maxWidth = 5,
  lineHeight = 1.2,
  position = new THREE.Vector3(0, 0, 0),
  rotation = new THREE.Euler(0, 0, 0),
}: {
  text: string;
  fontSize?: number;
  maxWidth?: number;
  lineHeight?: number;
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
}): Promise<THREE.Group> {
  const loader = new FontLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      '/dm_mono_light.json',
      async function (font) {
        const group = new THREE.Group();

        const lines = breakTextIntoLines(text, font, fontSize, maxWidth);

        for (let i = 0; i < lines.length; i++) {
          const lineText = await createText({
            text: lines[i],
            fontSize,
            position: new THREE.Vector3(0, -i * fontSize * lineHeight, 0),
            rotation: new THREE.Euler(0, 0, 0),
          });
          group.add(lineText);
        }

        group.position.copy(position);
        group.rotation.copy(rotation);

        resolve(group);
      },
      undefined,
      function (error) {
        reject(error);
      }
    );
  });
}
