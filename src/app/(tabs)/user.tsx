/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-04-17 10:56:19
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-05-11 15:57:03
 * @FilePath: \wanWanExpo\src\app\(tabs)\user.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { Text, View } from '@/components/Themed'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
  Image,
  Text as NativeText,
  View as NativeView,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default function TabUserScreen() {
  const router = useRouter()
  return (
    <ScrollView className="flex-1 bg-[#f5f5f5]">
      {/* 顶部黄色区域 */}
      <NativeView className="bg-[#fede2b] py-10 px-5 flex-row justify-between items-start border-b-[1px] border-[#e0e0e0] rounded-b-[10]">
        <NativeView className="flex-row items-center bg-transparent">
          <Image
            source={{
              uri: 'https://img0.baidu.com/it/u=4060187940,3351722992&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200'
            }}
            className="w-20 h-20 rounded-[40] bg-white mr-4"
          />
          <Text className="text-lg text-[#333]">大帅</Text>
        </NativeView>

        <TouchableOpacity className="bg-white px-2 rounded-[10]">
          <Text className="text-sm text-[#333]">超管</Text>
        </TouchableOpacity>
      </NativeView>

      {/* 功能卡片区域 */}
      <View style={styles.menuCard}>
        <View className="flex-row justify-around bg-transparent">
          {/* 店铺 */}
          <TouchableOpacity
            className="flex-1 items-center"
            onPress={() => router.push('/user/shop')}
          >
            <View className="w-[60] justify-center items-center relative bg-transparent">
              <Ionicons name="storefront-outline" size={32} color="#666" />
            </View>
            <Text className="mt-2 text-sm color-[#666]">店铺</Text>
          </TouchableOpacity>

          {/* 设置 */}
          <TouchableOpacity className="flex-1 items-center">
            <View className="w-[60] justify-center items-center relative bg-transparent">
              <Ionicons name="settings-outline" size={32} color="#666" />
            </View>
            <Text className="mt-2 text-sm color-[#666]">设置</Text>
          </TouchableOpacity>

          {/* 日志 */}
          <TouchableOpacity className="flex-1 items-center">
            <View className="w-[60] justify-center items-center relative bg-transparent">
              <Ionicons name="lock-closed-outline" size={32} color="#666" />
              <NativeView className="absolute top-0 right-0 bg-[#ff4444] rounded-[10] min-w-[10] h-4 justify-center items-center px-1">
                <NativeText className="color-white text-xs font-bold">3</NativeText>
              </NativeView>
            </View>
            <Text className="mt-2 text-sm color-[#666]">日志</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  menuCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 6,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  }
})
