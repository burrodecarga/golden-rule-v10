import { useThemeColor } from '@/hooks/use-theme-color'
import { Platform, Pressable, View } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import { ThemedText } from './ThemedText'

interface Props {
  text?: string
  value: boolean
  className?: string

  onValueChange: (value: boolean) => void
}

const isAndroid=Platform.OS==='android'

const ThemedSwitch=({ text, value, className, onValueChange }: Props) => {
  const switchActiveColor=useThemeColor({}, 'primary')

  return (
    <Pressable
      style={{ flex: 1, flexDirection: 'row', marginHorizontal: 8, justifyContent: 'space-between', alignItems: 'center' }}
      onPress={() => onValueChange(!value)}
    >
      {text? <ThemedText type="subtitle">{text}</ThemedText>:<View />}
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={isAndroid? switchActiveColor:''}
        // ios_backgroundColor={value ? 'green' : 'red'}
        trackColor={{
          false: 'grey',
          true: switchActiveColor,
        }}
      />
    </Pressable>
  )
}
export default ThemedSwitch
