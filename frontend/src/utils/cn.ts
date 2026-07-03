export function cn(...classes: unknown[]): string {
  return classes.filter((c) => typeof c === 'string' || typeof c === 'boolean').filter(Boolean).join(' ');
}
