class util {
  /**
   * @desc 深拷贝
   * @param {any} data - 要拷贝的数据
   * @returns {any} 拷贝后的数据
   */
  deepClone<T>(data: T): T {
    if (typeof data !== 'object' || data === null) return data
    return JSON.parse(JSON.stringify(data))
  }

  /**
   * 根据时间戳和格式返回格式化的日期字符串
   * @param {number} timestamp - 时间戳
   * @param {string} format - 日期格式
   * @returns {string} 格式化后的日期字符串
   * @example
   * formatDate(1507513800642, 'yyyy/MM/dd hh:mm:ss') => '2017/10/09 09:50:00'
   * formatDate(1507513800642, 'yyyy-MM-dd hh:mm:ss') => '2017-10-09 09:50:00'
   * formatDate(1507513800642, 'yyyy.MM.dd , hh-mm-ss') => '2017.10.09 , 09-50-00'
   */
  formatDate(timestamp: number, format: string): string {
    if (!timestamp) return ''

    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return ''

    const timeUnits: Record<string, number> = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }

    format = format.replace(/(y+)/g, match => (date.getFullYear() + '').slice(-match.length))

    Object.entries(timeUnits).forEach(([key, value]) => {
      format = format.replace(new RegExp(`(${key})`), match =>
        match.length === 1 ? String(value) : ('00' + value).slice(-match.length)
      )
    })

    return format
  }

  /**
   * @desc 格式化日期时间
   * @param {Date} date - 日期对象
   * @param {boolean} [includeTime] - 是否包含时间,默认false只返回日期
   * @returns {string} 格式化后的日期时间字符串
   */
  formatDateTime(date: Date | string | number, includeTime = false): string {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) return ''

    const padZero = (num: number): string => num.toString().padStart(2, '0') // 补零

    const dateParts = [
      dateObj.getFullYear(),
      padZero(dateObj.getMonth() + 1),
      padZero(dateObj.getDate())
    ]

    if (!includeTime) return dateParts.join('-')

    return `${dateParts.join('-')} ${padZero(dateObj.getHours())}:${padZero(dateObj.getMinutes())}`
  }

  /**
   * @desc 验证并格式化数字
   * @param {number | string} value - 要验证的数值
   * @returns {number} 格式化后的数值,非法输入返回0
   */
  validateNumber(value: number | string): number {
    const strValue = String(value) // 转换为字符串处理
    if (/^[1-9]\d*$/.test(strValue)) return Number(strValue) // 判断是否为正整数
    if (/^\d+(\.\d+)?$/.test(strValue)) return Number(Number(strValue).toFixed(4)) // 判断是否为合法小数，保留4位小数
    return 0 // 非法输入返回0
  }

  /**
   * @desc 节流函数 - 限制函数在指定时间内只执行一次
   * @param {Function} callback - 需要执行的函数
   * @param {number} wait - 等待时间(毫秒)
   * @returns {Function} 节流后的函数
   */
  throttle<T extends (...args: any[]) => any>(
    callback: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let lastExecTime = 0

    return function (this: unknown, ...args: Parameters<T>) {
      const currentTime = Date.now()
      const remainingTime = lastExecTime + wait - currentTime

      if (remainingTime <= 0) {
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        lastExecTime = currentTime
        callback.apply(this, args)
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastExecTime = Date.now()
          timeoutId = null
          callback.apply(this, args)
        }, remainingTime)
      }
    }
  }

  /**
   * @desc 将对象转换为URL查询字符串
   * @param {Record<string, any>} params - 要转换的参数对象
   * @returns {string} 转换后的URL查询字符串
   */
  urlJsonList(params: Record<string, any>): string {
    return Object.entries(params)
      .filter(([_, value]) => value != null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&')
  }

  /**
   * @desc 验证手机号码
   * @param {string | number} value - 要验证的电话号码
   * @returns {Promise<void>} 验证结果
   */
  isMobileNumber(value: string | number): Promise<void> {
    if (!value) {
      return Promise.reject(new Error('请输入电话号码'))
    }

    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(String(value))
      ? Promise.resolve()
      : Promise.reject(new Error('手机号码格式如:138xxxx8754'))
  }
}

export default new util()
