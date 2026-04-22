/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-04-17 10:07:04
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-22 08:13:56
 * @FilePath: \wanWanExpo\src\app\(tabs)\_layout.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const resolvedColorScheme = colorScheme === 'dark' ? 'dark' : 'light'

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[resolvedColorScheme].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(true, true), // 在web端禁用静态渲染头部
        // 设置头部样式
        headerStyle: {
          backgroundColor: '#fede2b'
        },
        headerTintColor: '#000', // 设置头部文字颜色
        // 设置底部标签栏样式
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 52
        },
        // 设置底部标签栏文字样式
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 1
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[resolvedColorScheme].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: '流水',
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          title: '图表',
          tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />
        }}
      />
    </Tabs>
  )
}
