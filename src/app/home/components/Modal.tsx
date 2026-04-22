import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

interface ModalComponentProps {
  visible: boolean
  onClose: () => void
}

interface FormData {
  expensesName: string
  money: string
  paymentId: number
  paymentName: string
  createDate: string
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}

const MyModal = ({ visible, onClose }: ModalComponentProps) => {
  const [expensesName, setExpensesName] = useState('')
  const [money, setMoney] = useState('')
  const [paymentId, setPaymentId] = useState<number>(2) // 默认选中微信
  const [paymentName, setPaymentName] = useState('')
  const [shopName, setShopName] = useState('')
  const [remark, setRemark] = useState('')

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
    setPaymentId(id)
    const selectedOption = paymentOptions.find(item => item.id === Number(id))
    if (selectedOption) {
      setPaymentName(selectedOption.name)
    }
  }

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
    setMoney(cleaned)
  }

  return (
    <View style={styles.centeredView}>
      {/* Modal 组件 */}
      <Modal
        animationType="fade" // 淡入淡出效果更自然
        transparent={true} // 必须为 true
        visible={visible}
        onRequestClose={() => onClose()} // 安卓返回键处理
      >
        {/* --- 核心部分：遮罩层容器 --- */}
        <View style={styles.overlay}>
          {/* --- 遮罩背景 (点击这里触发关闭) --- */}
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1} // 点击时不改变透明度
            onPress={onClose}
          />

          {/* --- 弹窗内容 (点击这里不关闭) --- */}
          <View style={styles.modalView}>
            <Text style={styles.modalText}>我是弹窗内容</Text>

            <View className="flex-row justify-between items-center gap-2 mb-4">
              <Text style={{ width: 80 }}>支出类型</Text>
              <TextInput
                style={styles.input}
                placeholder="在此输入类型"
                placeholderTextColor="#999"
                value={expensesName}
                onChangeText={setExpensesName} // 当文本变化时更新 state
              />
            </View>

            <View className="flex-row justify-between items-center gap-2 mb-4">
              <Text style={{ width: 80 }}>金额</Text>
              <TextInput
                style={styles.input}
                placeholder="在此输入金额"
                placeholderTextColor="#999"
                inputMode="numeric" // 移动端唤起数字键盘
                value={money}
                onChangeText={handleMoneyChange} // 当文本变化时更新 state
              />
            </View>

            <View className="flex-row justify-between items-center gap-2 mb-4">
              <Text style={{ width: 80 }}>店铺名称</Text>
              <TextInput
                style={styles.input}
                placeholder="在此输入店铺"
                placeholderTextColor="#999"
                value={shopName}
                onChangeText={setShopName} // 当文本变化时更新 state
              />
            </View>

            <View className="flex-row justify-between items-center gap-2 mb-4">
              <Text style={{ width: 80 }}>支付类型</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={paymentId}
                  onValueChange={itemValue => handlePaymentSelect(itemValue as number)}
                  style={styles.picker}
                  itemStyle={{ color: '#000', fontSize: 16 }}
                >
                  {paymentOptions.map(item => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ width: 80 }}>备注</Text>
              <TextInput
                style={styles.remark}
                placeholder="在此输入备注"
                placeholderTextColor="#999"
                multiline={true} // 允许多行输入
                numberOfLines={3} // 显示 3 行
                value={remark}
                onChangeText={setRemark} // 当文本变化时更新 state
              />
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
                console.log(
                  '提交的数据：',
                  expensesName,
                  money,
                  shopName,
                  paymentId,
                  paymentName,
                  remark
                )
              }}
            >
              <Text style={styles.textStyle}>提交</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },

  // 1. 外层容器：全屏，居中
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // 2. 遮罩背景：绝对定位铺满全屏，半透明黑色
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)' // 关键：半透明黑色
  },

  // 3. 弹窗实体内容
  modalView: {
    width: 370,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5 // Android 阴影
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  submitBtn: {
    width: 320,
    marginTop: 10,
    backgroundColor: '#2196F3',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15
  },
  input: {
    width: 220,
    height: 42,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10 // 内边距，增加输入体验
  },
  remark: {
    width: 220,
    height: 80,
    textAlignVertical: 'top',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  pickerContainer: {
    width: 220,
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  picker: {
    width: '100%',
    height: 56
  }
})

export default MyModal
