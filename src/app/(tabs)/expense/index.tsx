import { format } from 'date-fns'
import { Redirect } from 'expo-router'

const Page = () => {
  const date = new Date()
  return <Redirect href={`/expense/${format(date, 'yyyy-MM')}`} />
}

export default Page
