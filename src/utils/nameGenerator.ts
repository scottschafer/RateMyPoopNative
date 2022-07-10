// import * as adjectives from '../lists/adjectives';
// import * as nouns from '../lists/nouns';
// import * as superlatives from '../lists/superlatives';
// import * as locations from '../lists/locations';

import { nouns } from '../lists/nouns';
import { adjectives } from '../lists/adjectives';
import { superlatives } from '../lists/superlatives';
import { locations } from '../lists/locations';

const singularNouns = nouns.map(n => n[0])
const pluralNouns = nouns.map(n => n[1])
//  Object.values(nouns)[0].map(n => n[0]);
// const pluralNouns = Object.values(nouns)[0].map(n => n[1]);

const formats = [
  'MC {NOUN} Pooper',
  'The {ADJECTIVE} Pooper',
  '{ADJECTIVE} {NOUN_PLURAL} Pooper',
  'The Honorable {NOUN} Pooper',
  'Lord {NOUN} Pooper',
  'Lady {NOUN} Pooper',
  'Poops with {NOUN_PLURAL}',
  '{SUPERLATIVE} Pooper',
  'The {LOCATION} Pooper',
  '{ADJECTIVE} {NOUN} Pooper',
  'Pooper of {NOUN_PLURAL}',
  'Pooper of {PLURAL_LOCATION}',
  'Destroyer of {ADJECTIVE} Poops',
  "{ADJECTIVE} poop",
  "poops in {PLURAL_LOCATION}",
  "No {ADJECTIVE} pooper",
  "{NOUN} of {ADJECTIVE} poops",
  "Sir Pooper the {ADJECTIVE}",
];

// function randomEntry<T>(v: Array<T> | {[index: number]: string} ): T {
function randomEntry<T>(list: Array<T>): T {
    // const list = Array.isArray(v) ? v : Object.values(v) as Array<T>;

  return list[Math.floor(Math.random() * list.length)];
}

const pluralize = (val:string) => {
  if (val.endsWith('s')) {
    return val;
  }
  if (val.endsWith('y')) {
    return val.substring(val.length-1) + 'ies';
  }
  return val + 's';
}

export const generateName = () => {
  const format = randomEntry(formats);

  return format
  .replace('{NOUN}', randomEntry(singularNouns))
  .replace('{NOUN_PLURAL}', randomEntry(pluralNouns))
  .replace('{ADJECTIVE}', randomEntry(adjectives))
  .replace('{SUPERLATIVE}', randomEntry(superlatives))
  .replace('{LOCATION}', randomEntry(locations))
  .replace('{PLURAL_LOCATION}', pluralize(randomEntry(locations)))
  .split(' ').map((word: string) => (word[0].toUpperCase() + word.substr(1))).join(' ');
}