/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-04-17 10:56:19
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-22 08:16:36
 * @FilePath: \wanWanExpo\src\app\(tabs)\user.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { StyleSheet } from 'react-native'

export default function TabUserScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>我的</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/user.tsx" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
