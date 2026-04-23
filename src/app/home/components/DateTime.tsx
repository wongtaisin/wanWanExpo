/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-04-23 09:30:12
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-23 09:38:30
 * @FilePath: \wanWanExpo\src\app\home\components\DateTime.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import _util from '../../../utils/utils'

interface ModalComponentProps {
  visible: boolean
  onClose: () => void
  title: string
}

interface FormData {
  expensesName: string
  money: string
  paymentId: number
  paymentName: string
  createDate: string
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}

const isIOS = Platform.OS === 'ios' // 是否为 iOS

const MyModal = ({ visible, onClose, title }: ModalComponentProps) => {
  const [createDate, setCreateDate] = useState(new Date()) // 创建日期
  const [showDate, setShowDate] = useState(false) // 显示日期选择器
  const [showTime, setShowTime] = useState(false) // 显示时间选择器

  // 处理日期选择变化
  const handleDateChange = (event: any, selectedDate: any) => {
    setShowDate(false) // 隐藏日期选择器
    setShowDate(isIOS) // iOS 上保持显示，Android 上自动隐藏
    if (event.type === 'set' && selectedDate) {
      setCreateDate(selectedDate)
      setShowTime(true) // 显示时间选择器
    }
  }

  // 处理时间选择变化
  const handleTimeChange = (event: any, selectedTime: any) => {
    setShowTime(false) // 隐藏时间选择器
    if (event.type === 'set' && selectedTime) {
      // 合并日期和时间
      const finalDate = new Date(
        createDate.getFullYear(),
        createDate.getMonth(),
        createDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      )
      setCreateDate(finalDate)
    }
  }

  return (
    <View className="flex-row justify-between items-center mb-4 w-full">
      <Text className="w-3/12">创建时间</Text>
      <TextInput
        className="w-9/12 h-10 border border-gray-300 rounded-md px-2"
        placeholder="请选择日期"
        placeholderTextColor="#999"
        value={_util.formatDateTime(createDate, true) || ''}
        onPress={() => setShowDate(true)}
      />

      {showDate && (
        <DateTimePicker
          value={createDate}
          mode={isIOS ? 'datetime' : 'date'} // 日期时间模式
          display={isIOS ? 'spinner' : 'default'} // iOS 推荐用 spinner，Android 用 default (弹窗)
          onChange={handleDateChange}
        />
      )}

      {showTime && !isIOS && (
        <DateTimePicker
          value={createDate}
          mode="time" // Android 上使用 time 模式
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '75%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10 // 内边距，增加输入体验
  }
})

export default MyModal
