/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-05-11 14:59:25
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-05-12 08:09:01
 * @FilePath: \wanWanExpo\src\app\user\_layout.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { Stack } from 'expo-router'

const UserLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#fede2b' },
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen name="shop/index" options={{ title: '商铺' }} />
      <Stack.Screen name="shop/edit" options={{ title: '商铺信息' }} />
    </Stack>
  )
}

export default UserLayout
