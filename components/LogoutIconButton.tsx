import { useThemeColor } from '@/hooks/use-theme-color'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { supabase } from '../lib/supabase'
const LogoutIconButton=() => {

  const primary=useThemeColor({}, 'primary')


  return (
    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => supabase.auth.signOut()}>
      <Ionicons name="log-out-outline" size={28} color={primary} />
    </TouchableOpacity>
  )
}
export default LogoutIconButton
