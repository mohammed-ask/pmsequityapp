import React, { useEffect, useRef } from 'react'
import {
  ScrollView,
  SafeAreaView,
  Platform,
  View,
  ViewStyle
} from 'react-native'
import { useScrollToTop } from '@react-navigation/native'

interface MainLayoutProps {
  children: React.ReactNode
  hideScroll?: boolean
  navigation?: any // Replace 'any' with the appropriate navigation type
  isFocused?: boolean
  bgColor?: string
  ph?: number
  pb?: number
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  hideScroll,
  isFocused,
  bgColor,
  ph,
  pb
}) => {
  const ref = useRef<ScrollView>(null)

  useEffect(() => {
    if (isFocused) {
      ref.current?.scrollTo({
        y: 0,
        animated: true
      })
    }
  }, [isFocused])

  useScrollToTop(ref)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bgColor ?? '#fff'
      }}>
      <SafeAreaView
        style={{ flex: 1, paddingBottom: pb ?? Platform.OS === 'ios' ? 100 : 0, paddingHorizontal: ph ?? 20 }}>
        {hideScroll
          ? (
            <>{children}</>
          )
          : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              ref={ref}>
              {children}
            </ScrollView>
          )}
      </SafeAreaView>
    </View>
  )
}

const styles: {
  contentContainer: ViewStyle
} = {
  contentContainer: {
    flexGrow: 1
  }
}

export default MainLayout
