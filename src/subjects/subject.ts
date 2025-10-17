import type { Subject } from '../types/subjects';
import { nucleus } from './subatomic/nucleus';
import { quark } from './subatomic/quark';

export const subjects: Subject[] = [quark, nucleus];
