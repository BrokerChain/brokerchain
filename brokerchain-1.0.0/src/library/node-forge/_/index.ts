// Q1: Why this module?
// A1: Fix forge type declaration
//     A ESModule + Typescript Specific problem
//     - import forge from "forge" is correct in node.js but not correct in typescript
//     - I have to cheat the tsc here
// Q2: Why not allowSyntheticDefaultImports: true?
// A2: I don't want the typescript magic any more. Keep the way simple and stupid.
// -
// it is not required anymore
import * as F from "node-forge";
export const forge: typeof F = (F as any).default || F; // nodejs works with F.default but vite works with F

if (!forge) {
    throw new Error("forge module doesn't export default, unexpected");
}
