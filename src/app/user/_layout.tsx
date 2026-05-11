/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-05-11 14:59:25
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-05-11 16:58:15
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
        headerStyle: { backgroundColor: '#fede2b' }
      }}
    >
      <Stack.Screen name="shop/index" options={{ title: '商铺' }} />
    </Stack>
  )
}

export default UserLayout
