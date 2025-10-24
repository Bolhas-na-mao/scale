import type {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  Object3DEventMap,
} from 'three';
import * as THREE from 'three';

export type Subject<
  TGeometry extends BufferGeometry = BufferGeometry,
  TMaterial extends Material | Material[] = Material | Material[],
> = {
  entity: Mesh<TGeometry, TMaterial, Object3DEventMap> | Group;
  update?: (deltaTime: number, scale: number, camera: THREE.Camera) => void;
  onEnter?: () => void;
  onExit?: () => void;
};
