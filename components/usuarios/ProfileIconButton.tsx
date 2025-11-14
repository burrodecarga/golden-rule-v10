import { useThemeColor } from '@/hooks/use-theme-color'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native'
const ProfileIconButton=() => {

  const primary=useThemeColor({}, 'primary')

  return (
    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => router.push('/_sitemap')}>
      <Ionicons name="person-circle-outline" size={28} color={primary} />
    </TouchableOpacity>
  )
}
export default ProfileIconButton
