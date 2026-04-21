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
  const [paymentId, setPaymentId] = useState('')
  const [shopName, setShopName] = useState('')
  const [remark, setRemark] = useState('')

  return (
    <View style={styles.centeredView}>
      {/* Modal 组件 */}
      <Modal
        animationType="fade" // 淡入淡出效果更自然
        transparent={true} // 必须为 true
        visible={visible}
        onRequestClose={onClose} // 安卓返回键处理
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

            <View className="flex-row justify-between items-center px-4 py-3">
              <Text style={{ width: 80 }}>支出类型</Text>
              <TextInput
                style={styles.input}
                placeholder="在此输入类型"
                placeholderTextColor="#999"
                value={expensesName}
                onChangeText={setExpensesName} // 当文本变化时更新 state
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ width: 80 }}>金额</Text>
              <TextInput
                style={styles.input}
                placeholder="在此输入金额"
                placeholderTextColor="#999"
                value={money}
                onChangeText={setMoney} // 当文本变化时更新 state
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ width: 80 }}>店铺名称</Text>
              <TextInput
                style={styles.input}
                placeholder="在此输入店铺"
                placeholderTextColor="#999"
                value={shopName}
                onChangeText={setShopName} // 当文本变化时更新 state
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ width: 80 }}>支付类型</Text>
              <TextInput
                style={styles.input}
                placeholder="在此输入类型"
                placeholderTextColor="#999"
                value={paymentId}
                onChangeText={setPaymentId} // 当文本变化时更新 state
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ width: 80 }}>备注</Text>
              <TextInput
                style={styles.input}
                placeholder="在此输入备注"
                placeholderTextColor="#999"
                multiline={true} // 允许多行输入
                numberOfLines={4} // 显示 4 行
                value={remark}
                onChangeText={setRemark} // 当文本变化时更新 state
              />
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={() => onClose()}>
              <Text style={styles.textStyle}>关闭弹窗</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // 关键：半透明黑色
  },

  // 3. 弹窗实体内容
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
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
  closeBtn: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    padding: 10,
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
    width: 240,
    // height: 36,
    padding: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10
  }
})

export default MyModal
