import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import CustomText from './custom-text'

type ButtonProps = { text: string } & Pick<TouchableOpacityProps, 'onPress'>

const Button = ({ text, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="self-center border border-accent rounded-lg p-3"
      onPress={onPress}
    >
      <CustomText variant="accent">{text}</CustomText>
    </TouchableOpacity>
  )
}

export default Button
