import { Iconify } from 'react-native-iconify'

export type TCategory =
  | 'Food'
  | 'Social Life'
  | 'Transport'
  | 'Household'
  | 'Daily Needs'
  | 'Apparel'
  | 'Health'
  | 'Education'
  | 'Gift'

export const CategoryIcon: Record<string, JSX.Element> = {
  Food: <Iconify icon="ph:bowl-food" size={24} color="white" />,
  'Social Life': <Iconify icon="formkit:people" size={24} color="white" />,
  Transport: <Iconify icon="ph:train" size={24} color="white" />,
  Household: <Iconify icon="ph:house" size={24} color="white" />,
  'Daily Needs': (
    <Iconify icon="ph:shopping-cart-simple" size={24} color="white" />
  ),
  Apparel: <Iconify icon="ph:coat-hanger" size={24} color="white" />,
  Health: <Iconify icon="solar:health-linear" size={24} color="white" />,
  Education: <Iconify icon="ph:student" size={24} color="white" />,
  Gift: <Iconify icon="ph:gift" size={24} color="white" />,
}

export const CATEGORY_COLOR: Record<string, string> = {
  Food: '#8a3ffc',
  'Social Life': '#33b1ff',
  Transport: '#007d79',
  Household: '#ff7eb6',
  'Daily Needs': '#8a3800',
  Apparel: '#fff1f1',
  Health: '#6fdc8c',
  Education: '#d2a106',
  Gift: '#ba4e00',
}
