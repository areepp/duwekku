import tailwindConfig from '../tailwind.config'

type TCustomColors = {
  accent: string
  background: string
  backgroundCard: string
  primary: string
  secondary: string
  text: string
}

const CUSTOM_COLORS = tailwindConfig.theme?.extend?.colors as TCustomColors

export default CUSTOM_COLORS
