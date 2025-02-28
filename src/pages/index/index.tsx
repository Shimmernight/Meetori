// src/pages/index/index.tsx
import { useEffect } from 'react'
import { View } from '@tarojs/components'
import ShakeDetector from '@/utils/shakeDetector'
import { LottieAnimation } from '@/components/LottieAnimation'
import Taro from '@tarojs/taro'

export default function Home() {
  // 初始化传感器
  useEffect(() => {
    ShakeDetector.init()
    ShakeDetector.start(() => {
      Taro.vibrateShort() // 触觉反馈
      console.log('Shake detected!')
    })
    
    return () => ShakeDetector.stop()
  }, [])

  return (
    <View>
      <LottieAnimation 
        path="/assets/animations/shake.json" // 示例动画路径
        loop={false}
      />
    </View>
  )
}
