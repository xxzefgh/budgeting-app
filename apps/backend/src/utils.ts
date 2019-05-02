export function nullOrUndefined(x: any) {
  return x === null || x === undefined;
}

export function throwIfFalsy(error: Error) {
  return function<T>(x: T): T {
    if (x) return x;
    else throw error;
  };
}
