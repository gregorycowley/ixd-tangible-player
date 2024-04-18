import { createContext } from 'react';
// import TangibleEngineAdapter from '../tangible-engine/TangibleEngineAdapter.js';
// const te = new TangibleEngineAdapter(4949, '');
const te = {run: () => {}, stop: () => {} };
export const TEContext = createContext(te);
