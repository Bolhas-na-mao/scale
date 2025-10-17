import type { Subject } from '../types/subjects';
import { blackHole } from './astronomic/black-hole';
import { cluster } from './astronomic/cluster';
import { galaxy } from './astronomic/galaxy';
import { nebulae } from './astronomic/nebulae';
import { planet } from './astronomic/planet';
import { satellite } from './astronomic/satellite';
import { star } from './astronomic/star';
import { system } from './astronomic/system';
import { universe } from './astronomic/universe';
import { cell } from './classical/cell';
import { grain } from './classical/grain';
import { dna } from './molecular/dna';
import { organicMolecule } from './molecular/organic-molecule';
import { protein } from './molecular/protein';
import { simpleMolecule } from './molecular/simple-molecule';
import { virus } from './molecular/virus';
import { atom } from './subatomic/atom';
import { nucleus } from './subatomic/nucleus';
import { quark } from './subatomic/quark';

const list: Subject[] = [
  quark,
  nucleus,
  atom,
  simpleMolecule,
  organicMolecule,
  protein,
  dna,
  virus,
  cell,
  grain,
  planet,
  satellite,
  star,
  blackHole,
  system,
  nebulae,
  galaxy,
  cluster,
  universe,
];

let previous: Subject | null = null;
let current: Subject = list[0];
let next: Subject | null = list[1];

function moveFoward() {
  const currentIndex = list.indexOf(current);

  previous = list[currentIndex];
  current = list[currentIndex + 1];
  next = list[currentIndex + 2];
}

function moveBackwards() {
  const currentIndex = list.indexOf(current);

  previous = list[currentIndex - 2];
  current = list[currentIndex - 1];
  next = list[currentIndex];
}

export const subjects = {
  list,
  current,
  previous,
  next,
  moveFoward,
  moveBackwards,
};
