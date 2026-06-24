import type { DeckSlide } from './slides'

/** Make a chunk of slide text read naturally through text-to-speech. */
function clean(t: string): string {
  return t
    .replace(/★/g, '')
    .replace(/¼/g, 'one quarter')
    .replace(/½/g, 'one half')
    .replace(/⅓/g, 'one third')
    .replace(/⚖/g, ' versus ')
    .replace(/→/g, ' to ')
    .replace(/[–—]/g, ' ')
    .replace(/&/g, ' and ')
    .replace(/%/g, ' percent')
    .replace(/£/g, ' pounds ')
    .replace(/·/g, ', ')
    .replace(/^\s*\d+\s*,\s*/, '') // drop leading "1 ·" style numbering
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/** Build a spoken script for a single slide from its visible content. */
export function slideSpeech(slide: DeckSlide): string {
  const parts: string[] = [clean(slide.title) + '.']
  if (slide.subtitle) parts.push(clean(slide.subtitle) + '.')
  if (slide.bullets) parts.push(...slide.bullets.map((b) => clean(b) + '.'))
  if (slide.columns)
    for (const c of slide.columns) {
      parts.push(clean(c.heading) + ':')
      parts.push(...c.items.map((i) => clean(i) + '.'))
    }
  if (slide.note) parts.push('Note: ' + clean(slide.note))
  return parts.join(' ')
}
