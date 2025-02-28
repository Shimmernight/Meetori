// src/utils/shakeDetector.ts
import { Accelerometer } from 'expo-sensors'
import { throttle } from 'lodash'

// 配置参数
const SHAKE_THRESHOLD = 15 // 加速度阈值（m/s²）
const SHAKE_INTERVAL = 1000 // 防抖间隔（ms）

class ShakeDetector {
  private lastShakeTime = 0
  private subscription: any = null
  
  // 初始化传感器
  init = async () => {
    await Accelerometer.setUpdateInterval(100) // 100ms采样间隔
  }

  // 启动检测
  start(callback: () => void) {
    this.subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x**2 + y**2 + z**2) // 三维加速度合成
      const now = Date.now()
      
      if (acceleration > SHAKE_THRESHOLD && now - this.lastShakeTime > SHAKE_INTERVAL) {
        this.lastShakeTime = now
        callback()
      }
    })
  }

  // 停止检测
  stop() {
    this.subscription?.remove()
  }
}

export default new ShakeDetector()
