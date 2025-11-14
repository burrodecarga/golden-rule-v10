import { Tabs } from 'expo-router'
import React from 'react'

import { HapticTab } from '@/components/haptic-tab'
import Back from '@/components/tareas/BackTareas'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useAuthInfo } from '@/provider/AuthProvider'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function TabHomeLayout() {
  const colorScheme=useColorScheme()
  const { isAdmin }=useAuthInfo()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme??'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        // headerTitleAlign: 'center',
        // headerRight: () => <LogoutIconButton />,
        // headerLeft: () => <View style={{ marginLeft: 20 }}><ProfileIconButton /></View>,
      }}>
      <Tabs.Protected guard={true}>
        <Tabs.Screen
          name="inicio"
          options={{
            title: 'Inicio',
            headerShown: true,
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar-check-outline" size={24} color={color} />,
          }}
        />
      </Tabs.Protected>

      <Tabs.Protected guard={!isAdmin}>
        <Tabs.Screen
          name="tareas"
          options={{
            title: 'Tareas',
            headerShown: true,
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="truck-fast-outline" size={24} color={color} />,
            headerLeft: () => <Back />
          }}
        />
      </Tabs.Protected>
      <Tabs.Protected guard={isAdmin}>
        <Tabs.Screen
          name="servicios"
          options={{
            title: 'servicios',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="truck-fast-outline" size={24} color={color} />,
          }}
        />
      </Tabs.Protected>
      <Tabs.Protected guard={isAdmin}>
        <Tabs.Screen
          name="estadisticas"
          options={{
            title: 'estadisticas',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chart-bell-curve" size={24} color={color} />,
          }}
        />
      </Tabs.Protected>

      <Tabs.Screen
        name="chat"
        options={{
          title: 'chat',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chat-alert-outline" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="ajustes"
        options={{
          title: 'ajustes',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog-play-outline" size={24} color={color} />,
        }}
      />


    </Tabs>
  )
}
