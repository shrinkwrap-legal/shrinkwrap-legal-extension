export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

export function harmonizeCourtCasing(str: string | null): string | null {
  const allowedCourts = ["Justiz", "VwGH", "VfGH", "BVwG", "LVwG", "DSB", "GBK"];
  let courts = allowedCourts.filter(c => c.toLowerCase() == str?.toLowerCase());
  if (courts.length == 0) {
    return null;
  }
  return courts[0];
}
export function getReadTimeInMinutesFromWordcount(words: number): number {
  return words / 150;
}