// src/components/LottieAnimation/index.tsx
import Taro from '@tarojs/taro'
import { useEffect, useRef } from 'react'
import lottie from 'lottie-miniprogram' // 小程序专用版本

export const LottieAnimation = ({ path, loop = true }) => {
  const animationRef = useRef<ReturnType<typeof lottie.loadAnimation> | null>(null)
  const canvasId = useRef(`lottie-canvas-${Date.now()}`)

  // 初始化动画
  useEffect(() => {
    const init = async () => {
      const context = Taro.createCanvasContext(canvasId.current)
      
      // 加载JSON资源（需预先转换格式）
      const animationData = await Taro.request({
        url: path,
        dataType: 'text'
      })

      animationRef.current = lottie.loadAnimation({
        renderer: 'canvas',
        loop,
        autoplay: true,
        animationData: JSON.parse(animationData.data),
        rendererSettings: {
          context,
          preserveAspectRatio: 'xMidYMid slice',
          clearCanvas: true
        }
      })
    }

    init()
    
    return () => animationRef.current?.destroy() // 清理资源
  }, [])

  return (
    <canvas 
      id={canvasId.current}
      style={{ width: '100%', height: '200px' }}
    />
  )
}
