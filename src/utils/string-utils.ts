export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

export function harmonizeCourtCasing(str: string | null): string {
  const allowedCourts = ["Justiz", "VwGH", "VfGH", "BVwG", "LVwG", "DSB", "GBK"];
  let court = allowedCourts.filter(c => c.toLowerCase() == str?.toLowerCase())[0];
  return court;
}
export function getReadTimeInMinutesFromWordcount(words: number): number {
  return words / 150;
}