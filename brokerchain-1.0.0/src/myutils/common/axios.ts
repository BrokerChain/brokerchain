// Q1: Why this module?
// A1: Fix axios type declaration
//     A ESModule + Typescript Specific problem
//     - import axios from "axios" is correct in node.js but not correct in typescript
//     - I have to cheat the tsc here
// Q2: Why not allowSyntheticDefaultImports: true?
// A2: I don't want the typescript magic any more. Keep the way simple and stupid.

import { Axios } from "axios";
import _axios from "axios";
export const axios: Axios = _axios as any;
