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

let currentIndex = 0;

export const subjects = {
  list,
  get current() {
    return list[currentIndex];
  },
  get previous() {
    return currentIndex > 0 ? list[currentIndex - 1] : null;
  },
  get next() {
    return currentIndex < list.length - 1 ? list[currentIndex + 1] : null;
  },
  setNext() {
    if (currentIndex < list.length - 1) currentIndex++;
  },
  setPrevious() {
    if (currentIndex > 0) currentIndex--;
  },
};
