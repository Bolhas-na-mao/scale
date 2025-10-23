import type {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  Object3DEventMap,
} from 'three';

export type Subject<
  TGeometry extends BufferGeometry = BufferGeometry,
  TMaterial extends Material | Material[] = Material | Material[],
> = {
  entity: Mesh<TGeometry, TMaterial, Object3DEventMap> | Group;
  update?: (deltaTime: number, scale: number) => void;
  onEnter?: () => void;
  onExit?: () => void;
};
