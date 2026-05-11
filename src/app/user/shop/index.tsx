/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-05-11 14:16:26
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-05-11 16:16:07
 * @FilePath: \wanWanExpo\src\app\user\shop\index.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { useRef } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

const mockData: any[] = [
  {
    id: 44,
    user_id: 1,
    shop_name: '金迪便利店',
    province_code: '440000',
    province: '广东省',
    city_code: '441300',
    city: '惠州市',
    area_code: '441302',
    area: '惠城区',
    address: '克园仔二巷',
    images: '',
    remark: '',
    create_date: '2026-03-30 17:20:50',
    update_date: null
  },
  {
    id: 42,
    user_id: 1,
    shop_name: '美佳亲便利店',
    province_code: '440000',
    province: '广东省',
    city_code: '441300',
    city: '惠州市',
    area_code: '441303',
    area: '惠阳区',
    address: '三和经济开发区远超CBD家居惠州总部',
    images: '',
    remark: '',
    create_date: '2026-02-04 12:27:06',
    update_date: '2026-02-08T11:48:54.000Z'
  },
  {
    id: 41,
    user_id: 1,
    shop_name: '客家猪肉汤',
    province_code: '440000',
    province: '广东省',
    city_code: '441300',
    city: '惠州市',
    area_code: '441303',
    area: '惠阳区',
    address: '御和路与九子路交叉口东北140米',
    images: '',
    remark: '',
    create_date: '2026-02-04 08:24:47',
    update_date: null
  }
]

const shopRender = () => {
  const swipeableRefs = useRef<any[]>([])

  // 关闭其它打开项（微信效果）
  const closeOthers = (currentId: number) => {
    swipeableRefs.current.forEach((ref, id) => {
      if (id !== currentId) {
        ref.close()
      }
    })
  }

  const handleEdit = (item: any) => {
    console.log(item)
  }

  const handleDelete = (id: string) => {
    Alert.alert('删除:', '确认删除该店铺吗？', [
      { text: '取消', style: 'cancel' },
      { text: '确认', onPress: () => console.log('删除:', id) }
    ])
  }

  const renderRightActions = (item: any) => (
    <>
      <View className="bg-[#007aff] py-5 px-5 justify-center">
        <Text className="text-white" onPress={() => handleEdit(item)}>
          修改
        </Text>
      </View>
      <View className="bg-[red] py-5 px-5 justify-center">
        <Text className="text-white" onPress={() => handleDelete(item.id)}>
          删除
        </Text>
      </View>
    </>
  )

  const renderItem = ({ item }: { item: any }) => (
    <ReanimatedSwipeable
      // @ts-ignore - ReanimatedSwipeable 支持回调 ref，但类型定义不完整
      ref={(ref: any) => (swipeableRefs.current[item.id] = ref)}
      onSwipeableWillOpen={() => closeOthers(item.id)}
      renderRightActions={() => renderRightActions(item)}
      key={item.id}
    >
      <View
        style={{ borderBottomWidth: 1 }}
        className="flex-row justify-between items-center px-4 py-4 border-b-[#f9f9f9] bg-white"
      >
        <View className="flex-1 mr-4 ">
          <Text className="text-sm text-[#3b4144] mb-1">{item.shop_name}</Text>
          <Text className="text-base mb-1">
            {item.province}
            {item.city}
            {item.area}
            {item.address}
          </Text>
          <Text className="text-[#999] text-xs">{item.create_date}</Text>
        </View>
        <Text className="text-base">{item.money}</Text>
      </View>
    </ReanimatedSwipeable>
  )

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          data={mockData}
          renderItem={renderItem as any}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </GestureHandlerRootView>
    </>
  )
}

export default shopRender
