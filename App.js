import React, { useEffect } from 'react'
import { LoginStack } from './src/navigation/Mainnavigator'
import { NavigationContainer } from '@react-navigation/native'
import { LogBox } from 'react-native'

export default function App() {
  return (
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
  )
}
