import { Redirect } from 'expo-router'

const Page = () => {
  const date = new Date()
  return (
    <Redirect href={`/expense/${date.getFullYear()}-${date.getMonth() + 1}`} />
  )
}

export default Page
