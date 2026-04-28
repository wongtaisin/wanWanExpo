import { useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface SelectOption {
  id: number
  name: string
}

interface CustomSelectProps {
  options: SelectOption[]
  selectedValue: number
  onValueChange: (value: number) => void
  placeholder?: string
  title?: string
}

const CustomSelect = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = '请选择',
  title = '请选择'
}: CustomSelectProps) => {
  const [modalVisible, setModalVisible] = useState(false)

  const selectedOption = options.find(item => item.id === selectedValue)

  const handleSelect = (value: number) => {
    onValueChange(value)
    setModalVisible(false)
  }

  return (
    <>
      {/* 选择器触发按钮 */}
      <TouchableOpacity
        className="w-9/12 h-11 border border-gray-300 rounded-md px-3 flex-row justify-between items-center bg-white"
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text className={selectedOption ? 'text-black' : 'text-gray-400'}>
          {selectedOption?.name || placeholder}
        </Text>
        <Text className="text-gray-500">▼</Text>
      </TouchableOpacity>

      {/* 选项弹窗 */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 justify-center items-center"
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View
            className="w-4/5 bg-white rounded-lg overflow-hidden"
            style={styles.optionsContainer}
            onStartShouldSetResponder={() => true}
          >
            <View className="py-3 border-b border-gray-200">
              <Text className="text-center text-lg font-semibold">{title}</Text>
            </View>

            <ScrollView style={{ maxHeight: 300 }}>
              {options.map(item => (
                <TouchableOpacity
                  key={item.id}
                  className={`py-4 px-5 border-b border-gray-100 ${
                    item.id === selectedValue ? 'bg-blue-50' : 'bg-white'
                  }`}
                  onPress={() => handleSelect(item.id)}
                  activeOpacity={0.7}
                >
                  <View className="flex-row justify-between items-center">
                    <Text
                      className={`text-base ${
                        item.id === selectedValue ? 'text-blue-500 font-semibold' : 'text-black'
                      }`}
                    >
                      {item.name}
                    </Text>
                    {item.id === selectedValue && <Text className="text-blue-500 text-lg">✓</Text>}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              className="py-3 bg-gray-100"
              onPress={() => setModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text className="text-center text-gray-600">取消</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  optionsContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})

export default CustomSelect
