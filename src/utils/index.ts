export function getNextId(state: Array<any>) {
  if (!state.length) return 1;
  return Math.max(...state.map((a) => a.id)) + 1;
}
