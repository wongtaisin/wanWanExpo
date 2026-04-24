import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import _util from '../../utils/utils'
import DateTimes from './components/DateTime'

interface ModalComponentProps {
  visible: boolean
  onClose: () => void
  title?: string
}

interface FormData {
  expensesName: string
  money: string
  paymentId: number
  paymentName: string
  remark: string
  createDate: string
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}

const MyModal = ({ visible, onClose, title }: ModalComponentProps) => {
  const [params, setParams] = useState<FormData>({
    expensesName: '', // 支出名称
    money: '', // 金额
    paymentId: 2, // 默认微信
    paymentName: '', // 支付类型
    shopName: '', // 店铺名称
    remark: '', // 创建日期
    createDate: _util.formatDateTime(new Date(), true) // 格式化默认日期为 YYYY-MM-DD HH:mm
  })

  const formColumns = [
    { label: '支付类型', prop: 'expensesName' },
    {
      label: '金额',
      prop: 'money',
      handle: (val: string) => handleMoneyChange(val)
    },
    {
      label: '支付类型',
      prop: 'paymentName',
      placeholder: '请选择支付类型',
      slot: {
        render: (scope: FormData) => {
          return (
            <View className="w-9/12 border border-gray-300 rounded-md">
              <Picker
                selectedValue={scope.paymentId}
                onValueChange={val => handlePaymentSelect(val as number)}
                itemStyle={{ color: '#000', fontSize: 14 }}
              >
                {paymentOptions.map(item => (
                  <Picker.Item key={item.id} label={item.name} value={item.id} />
                ))}
              </Picker>
            </View>
          )
        }
      }
    },
    { label: '店铺名称', prop: 'shopName' },
    {
      label: '备注',
      prop: 'remark',
      slot: {
        render: (scope: FormData) => {
          return (
            <TextInput
              style={{ textAlignVertical: 'top' }}
              className="w-9/12 h-20 border border-gray-300 rounded-md px-2"
              placeholder="在此输入备注"
              placeholderTextColor="#999"
              multiline={true} // 允许多行输入
              numberOfLines={3} // 显示 3 行
              value={scope.remark}
              onChangeText={val => setParams({ ...scope, remark: val })} // 当文本变化时更新 state
            />
          )
        }
      }
    },
    {
      label: '创建时间',
      prop: 'createDate',
      placeholder: '请选择创建时间',
      slot: {
        render: (scope: FormData) => (
          <DateTimes onDataSend={date => setParams({ ...scope, createDate: date })} />
        )
      }
    }
  ]

  // 支付类型选项
  const paymentOptions = [
    { id: 1, name: '现金' },
    { id: 2, name: '微信' },
    { id: 3, name: '支付宝' },
    { id: 4, name: '信用卡' },
    { id: 5, name: '储蓄卡' },
    { id: 6, name: '抖音' }
  ]

  // 处理支付类型选择
  const handlePaymentSelect = (id: number) => {
    const selectedOption = paymentOptions.find(item => item.id === Number(id))
    if (selectedOption) {
      setParams({ ...params, paymentId: id, paymentName: selectedOption.name })
    }
  }

  // 处理金额输入变化
  const handleMoneyChange = (val: string) => {
    // 1. 正则替换：保留数字和小数点，确保只有一个小数点
    console.log('原始输入：', val)
    // 首先移除所有非数字和非小数点字符
    let cleaned = val.replace(/[^0-9.]/g, '')
    // 确保只有一个小数点
    const parts = cleaned.split('.')
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('')
    }
    // 确保小数点不在开头
    if (cleaned.startsWith('.')) {
      cleaned = '0' + cleaned
    }
    setParams({ ...params, money: cleaned })
  }

  return (
    <>
      {/* Modal 组件 */}
      <Modal
        animationType="fade" // 淡入淡出效果更自然
        transparent={true} // 必须为 true
        visible={visible}
        onRequestClose={() => onClose()} // 安卓返回键处理
      >
        {/* --- 核心部分：遮罩层容器 --- */}
        <View className="flex-1 justify-center items-center">
          {/* --- 遮罩背景 (点击这里触发关闭) --- */}
          <TouchableOpacity
            className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70"
            activeOpacity={0.7} // 点击时不改变透明度
            onPress={onClose}
          />

          {/* --- 弹窗内容 (点击这里不关闭) --- */}
          <View style={styles.modalView}>
            <Text className="mb-4 text-xl font-bold text-center">{title || '支出'}</Text>

            {formColumns.map((column: any, index: number) => {
              return (
                <View className="flex-row justify-between items-center mb-4 w-full" key={index}>
                  <Text className="w-3/12">{column.label}</Text>
                  {column.slot ? (
                    column.slot.render(params)
                  ) : (
                    <TextInput
                      style={styles.input}
                      placeholder={column.placeholder || `在此输入${column.label}`}
                      placeholderTextColor="#999"
                      value={params[column.prop]}
                      onChangeText={
                        column.handle ||
                        ((val: string) => setParams({ ...params, [column.prop]: val }))
                      } // 当文本变化时更新 state
                    />
                  )}
                </View>
              )
            })}

            <TouchableOpacity
              className="w-full pt-3 pb-3 bg-blue-500 rounded-md"
              onPress={() => {
                console.log('提交的数据：', params, _util.formatDateTime(params.createDate, true))
              }}
            >
              <Text className="text-white text-center">提交</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  // 3. 弹窗实体内容
  modalView: {
    width: '85%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5 // Android 阴影
  },
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
