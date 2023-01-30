export function camelCaseObject(o) {
  if (typeof o !== 'object' || !o) return o;
  return Object.fromEntries(Object.keys(o).map((k) => [k[0].toUpperCase() + k.slice(1), o[k]]));
}
