import IconFont from '@/components/IconFont'
import { useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import ModalComponent from '../home/ModalComponent'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

// 计算：每行4个，左右padding共20，间隙共5*8=40（4个item之间3个间隙 + 左右各1个）
const ITEM_SPACING = 8 // item 之间的间距（相当于 gap / 2）
const PADDING_HORIZONTAL = 16 // 容器左右内边距

// 可用宽度 = 屏幕宽度 - 左右 padding
const AVAILABLE_WIDTH = SCREEN_WIDTH - PADDING_HORIZONTAL * 2

// 每个 item 宽度 = (可用宽度 - 3个间隙) / 4
const ITEM_SIZE = (AVAILABLE_WIDTH - ITEM_SPACING * 3) / 4

const tableData = [
  { label: '吃', prop: 'eat', icon: 'food-mifan' },
  { label: '喝', prop: 'drink', icon: 'kekoukele2' },
  { label: '玩', prop: 'play', icon: 'a-GamePadyouxishoubing' },
  { label: '乐', prop: 'glad', icon: 'zhoubianyule' },
  { label: '过路费', prop: 'tolls', icon: 'guolufei' },
  { label: '车油', prop: 'oil', icon: 'jiayouzhan2' },
  { label: '停车费', prop: 'parking', icon: 'tingchefeiyong' },
  { label: '交通费', prop: 'traffic', icon: 'gongjiaoche' },
  { label: '超市', prop: 'supermarket', icon: 'chaoshi2' },
  { label: '网购', prop: 'online_shopping', icon: 'wanggou' },
  { label: '话费', prop: 'phone_bill', icon: 'dianhua' },
  { label: '红包', prop: 'red_packet', icon: 'hongbao2' },
  { label: 'vip', prop: 'vip', icon: 'vip1' },
  { label: '其他', prop: 'other', icon: 'qitafeiyong' }
]

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          {tableData.map((item, i) => (
            <Pressable
              key={i}
              style={[
                styles.item,
                // 每行第 4 个（index 从 0 开始）
                (i + 1) % 4 === 0 && styles.itemNoMargin
              ]}
              onPress={() => {
                console.log(item.prop, item.label)
                setModalVisible(true)
              }}
            >
              <>
                <IconFont name={item.icon as any} size={28} color="#000" />
                <Text style={styles.itemText}>{item.label}</Text>
              </>
            </Pressable>
          ))}
        </View>
      </View>

      {/* 弹窗组件 */}
      <ModalComponent visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: PADDING_HORIZONTAL // 和计算一致
  },
  flexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    // backgroundColor: 'deepskyblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ITEM_SPACING,
    marginRight: ITEM_SPACING,
    borderRadius: 8
  },
  itemText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333'
  },
  itemNoMargin: {
    marginRight: 0
  }
})

export default Home
