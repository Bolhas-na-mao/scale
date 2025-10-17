import type { BufferGeometry, Material, Mesh, Object3DEventMap } from 'three';

export type Subject<
  TGeometry extends BufferGeometry = BufferGeometry,
  TMaterial extends Material | Material[] = Material | Material[],
> = Mesh<TGeometry, TMaterial, Object3DEventMap>;
