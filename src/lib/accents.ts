/** Maps a flashcard category to one of the accent colours (no teal). */
export const CATEGORY_ACCENT: Record<string, string> = {
  Foundations: '#9E875D', // bronze
  'Pre-Contract': '#5B7DA6', // dusty blue
  Estimating: '#7C8C5A', // sage
  Tender: '#E0A23B', // amber
  'Post-Contract': '#8A6491', // plum
  Reporting: '#D9694C', // coral
}

export function accentFor(category: string): string {
  return CATEGORY_ACCENT[category] ?? '#9E875D'
}
