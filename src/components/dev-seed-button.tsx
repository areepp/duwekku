// THIS BUTTON IS ONLY FOR DEVELOPMENT PURPOSE
import { CATEGORIES } from '@/features/expense/utils/categories-constant'
import Button from './button'
import { createCategories } from '@/db/services/expenses'

const CATEGORY_NAMES = CATEGORIES.map((category) => ({ name: category.name }))

const DevSeedButton = () => {
  const seedDB = async () => {
    await createCategories(CATEGORY_NAMES)
    console.log('Seeding succesful')
  }

  return (
    <Button
      customClassName="fixed top-20 right-20 z-50"
      text="seed"
      onPress={seedDB}
    />
  )
}

export default DevSeedButton
