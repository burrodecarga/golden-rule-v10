import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/use-color-scheme'
import AuthProvider from '@/provider/AuthProvider'
import { UserProvider } from '@/provider/UserProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const unstable_settings={
  anchor: '(tabs)',
}

export default function RootLayout() {
  const colorScheme=useColorScheme()
  const SessionLayout=() => {
    return (

      <ThemeProvider value={colorScheme==='dark'? DarkTheme:DefaultTheme}>
        <Stack>
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>

    )
  }

  const queryClient=new QueryClient()
  return (
    <AuthProvider>
      <UserProvider>
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <SessionLayout />
          </QueryClientProvider>
        </GestureHandlerRootView>
      </UserProvider>
    </AuthProvider>
  )

}
