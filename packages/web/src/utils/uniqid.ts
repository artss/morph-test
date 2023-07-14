export function uniqid(): string {
  return [Date.now() + Math.random()].join('');
}
