import { useRef } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

// 模拟数据类型
interface ExpenseItem {
  id: number
  date: string
  title?: string
  description?: string
  time: string
  amount: number
}

interface GroupedExpense {
  date: string
  total: number
  items: ExpenseItem[]
}

// 模拟数据
const mockData: GroupedExpense[] = [
  {
    date: '2026-04-28',
    total: 6,
    items: [
      {
        id: 1,
        date: '2026-04-28',
        title: '炒米粉3，肉包1.5*2=3',
        time: '2026-04-28 07:44:31',
        amount: -6
      }
    ]
  },
  {
    date: '2026-04-27',
    total: 21,
    items: [
      {
        id: 2,
        date: '2026-04-27',
        title: '郑记汤粉猪脚饭东莞烧鹅',
        description: '汤饭',
        time: '2026-04-27 12:12:27',
        amount: -15
      },
      {
        id: 3,
        date: '2026-04-27',
        title: '炒面，肠粉，面太咸了，这家也不好吃',
        time: '2026-04-27 07:45:43',
        amount: -6
      }
    ]
  },
  {
    date: '2026-04-24',
    total: 6.5,
    items: [
      {
        id: 4,
        date: '2026-04-24',
        title: '美佳亲便利店',
        description:
          '王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉王老吉',
        time: '2026-04-24 12:28:07',
        amount: -3.5
      },
      {
        id: 5,
        date: '2026-04-24',
        description: '蒸河粉',
        time: '2026-04-24 08:47:27',
        amount: -3
      },
      {
        id: 6,
        date: '2026-04-24',
        description: '蒸河粉6',
        time: '2026-04-24 09:47:27',
        amount: -3
      },
      {
        id: 7,
        date: '2026-04-24',
        description: '蒸河粉7',
        time: '2026-04-24 10:47:27',
        amount: -3
      }
    ]
  },
  {
    date: '2026-04-23',
    total: 3.5,
    items: [
      {
        id: 8,
        date: '2026-04-23',
        title: '美佳亲便利店',
        description: '王老吉',
        time: '2026-04-23 12:32:31',
        amount: -3.5
      }
    ]
  }
]

export default function TabExpenseScreen() {
  // 计算统计数据
  const year = '2026'
  const month = '4'
  const totalCount = mockData.reduce((sum, group) => sum + group.items.length, 0)
  const totalAmount = mockData.reduce((sum, group) => sum + group.total, 0)

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
    Alert.alert('删除:', '确认删除该记录吗？', [
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

  const renderItem = ({ item }: { item: GroupedExpense }) => (
    <View className="bg-white">
      {/* 日期头部 */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-[#f9f9f9]">
        <Text className="text-[#a0a0a0] text-xs">📅 {item.date}</Text>
        <Text className="text-[#a0a0a0] text-xs">支出: {item.total}</Text>
      </View>

      {/* 该日期下的所有记录 */}
      {item.items.map(expense => (
        <ReanimatedSwipeable
          // @ts-ignore - ReanimatedSwipeable 支持回调 ref，但类型定义不完整
          ref={(ref: any) => (swipeableRefs.current[expense.id] = ref)}
          onSwipeableWillOpen={() => closeOthers(expense.id)}
          renderRightActions={() => renderRightActions(expense)}
          key={expense.id}
        >
          <View
            style={{ borderBottomWidth: 1 }}
            className="flex-row justify-between items-center px-4 py-4 border-b-[#f9f9f9]"
          >
            <View className="flex-1 mr-4">
              {expense.title && (
                <Text className="text-sm text-[#3b4144] mb-1">{expense.title}</Text>
              )}
              {expense.description && <Text className="text-base mb-1">{expense.description}</Text>}
              <Text className="text-[#999] text-xs">{expense.time}</Text>
            </View>
            <Text className="text-base">{expense.amount}</Text>
          </View>
        </ReanimatedSwipeable>
      ))}
    </View>
  )

  return (
    <>
      {/* 黄色顶部统计区域 */}
      <View className="bg-[#fede2b] py-5 px-4">
        <View className="flex-row justify-around items-start">
          <View className="items-center">
            <Text className="text-[#7c7b7b] text-sm mb-2">{year}年</Text>
            <Text className="text-2xl">
              {month}
              <Text className="text-xs ml-3">月</Text>
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-[#7c7b7b] text-sm mb-2">消费笔数</Text>
            <Text className="text-2xl">{totalCount}</Text>
          </View>
          <View className="items-center">
            <Text className="text-[#7c7b7b] text-sm mb-2">支出</Text>
            <Text className="text-2xl">{totalAmount}</Text>
          </View>
        </View>
      </View>

      {/* 流水列表 */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          data={mockData}
          renderItem={renderItem}
          keyExtractor={item => item.date}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </GestureHandlerRootView>
    </>
  )
}
