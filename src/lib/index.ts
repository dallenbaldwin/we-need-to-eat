/** @see {@link users.role} */
export const roles = ['user', 'admin'] as const

/** @see {@link meals.rating} */
export const ratings = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
] as const

/**
 * light theme options
 *
 * light if the text color is dark
 *
 * @see {@link https://daisyui.com/docs/themes/}
 */
export const lightThemes = [
  'light',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'retro',
  'cyberpunk',
  'valentine',
  'garden',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'cmyk',
  'autumn',
  'acid',
  'lemonade',
  'winter',
] as const

/**
 * dark theme options
 *
 * dark if the text color is light
 *
 * @see {@link https://daisyui.com/docs/themes/}
 */
export const darkThemes = [
  'dark',
  'synthwave',
  'halloween',
  'forest',
  'aqua',
  'black',
  'luxury',
  'dracula',
  'business',
  'night',
  'coffee',
] as const
