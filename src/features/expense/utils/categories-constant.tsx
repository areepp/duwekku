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

export const CATEGORIES: Array<{ name: TCategory; icon: JSX.Element }> = [
  {
    name: 'Food',
    icon: <Iconify icon="ph:bowl-food" size={24} color="white" />,
  },
  {
    name: 'Social Life',
    icon: <Iconify icon="formkit:people" size={24} color="white" />,
  },
  {
    name: 'Transport',
    icon: <Iconify icon="ph:train" size={24} color="white" />,
  },
  {
    name: 'Household',
    icon: <Iconify icon="ph:house" size={24} color="white" />,
  },
  {
    name: 'Daily Needs',
    icon: <Iconify icon="ph:shopping-cart-simple" size={24} color="white" />,
  },
  {
    name: 'Apparel',
    icon: <Iconify icon="ph:coat-hanger" size={24} color="white" />,
  },
  {
    name: 'Health',
    icon: <Iconify icon="solar:health-linear" size={24} color="white" />,
  },
  {
    name: 'Education',
    icon: <Iconify icon="ph:student" size={24} color="white" />,
  },
  {
    name: 'Gift',
    icon: <Iconify icon="ph:gift" size={24} color="white" />,
  },
]
