export function guid() {
    // TODO fix this
    // Problem
    //   Math.random().toString(36).substring(2) => length of output can be 10 or 11
    // Solution, only pick 10 characters
    return Math.random().toString(36).substring(2, 12);
}
