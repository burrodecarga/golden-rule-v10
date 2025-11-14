import { Image } from "react-native"
import { ThemedView } from "../themed-view"

interface AvatarProps {
  uri: string|null|undefined
  size?: number
}

export default function Avatar({ uri, size=32 }: AvatarProps) {
  const styles={ height: size, width: size, borderRadius: size/2 }
  if (uri) return <Image source={{ uri }} style={styles} />
  return (
    <ThemedView
      style={styles}
      darkColor="rgba(255,255,255,0.1)"
      lightColor="rgba(0,0,0,0.1)"
    />
  )
}
