export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)

export const parseCurrency = (amount: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount)
