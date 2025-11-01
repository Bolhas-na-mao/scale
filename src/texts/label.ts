import * as THREE from 'three';
import { createText, createMultiLineText } from './text';
import { createSquare } from './square';

/**
 * Cria um label de texto com uma moldura quadrada ao redor.
 */
export async function createLabel({
  title,
  content,
  titleFontSize = 0.5,
  contentFontSize = 0.35,
  squareSize = 6,
  position = new THREE.Vector3(0, 0, 0),
  rotation = new THREE.Euler(0, 0, 0),
  padding = 0.4,
  titleSpacing = 0.3,
}: {
  title: string;
  content?: string;
  titleFontSize?: number;
  contentFontSize?: number;
  squareSize?: number;
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
  padding?: number;
  titleSpacing?: number;
}): Promise<THREE.Group> {
  const group = new THREE.Group();

  const square = createSquare({
    size: squareSize,
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
  });

  const maxTextWidth = squareSize - padding * 2;

  const topY = squareSize / 2 - padding;

  const titleText = await createText({
    text: title,
    fontSize: titleFontSize,
    position: new THREE.Vector3(0, topY, 0),
    rotation: new THREE.Euler(0, 0, 0),
  });

  group.add(square, titleText);

  if (content) {
    const contentY = topY - titleFontSize - titleSpacing;

    const contentText = await createMultiLineText({
      text: content,
      fontSize: contentFontSize,
      maxWidth: maxTextWidth,
      lineHeight: 1.3,
      position: new THREE.Vector3(0, contentY, 0),
      rotation: new THREE.Euler(0, 0, 0),
    });
    group.add(contentText);
  }

  group.position.copy(position);
  group.rotation.copy(rotation);

  return group;
}
