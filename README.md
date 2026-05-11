# WanWan Expo App

WanWan 是一款个人费用支出管理应用，采用 Expo 和 React Native 技术栈开发，支持 iOS、Android 和 Web 平台。

## 功能特性

- 📱 跨平台支持（iOS、Android、Web）
- 💰 个人费用支出记录与管理
- 📊 数据可视化图表展示
- 👤 用户个人信息管理
- 🎨 美观的 UI 设计和主题切换

## 技术栈

- **React Native**: 跨平台原生应用开发
- **Expo**: 开发环境、构建和部署工具
- **Expo Router**: 基于文件系统的路由
- **TypeScript**: 类型安全的 JavaScript 超集
- **Tailwind CSS**: 实用优先的 CSS 框架（配合 NativeWind）
- **React Navigation**: 应用导航解决方案

## 项目结构

```
wanWanExpo/
├── src/
│   ├── app/                 # 应用页面路由
│   │   ├── (tabs)/         # 底部标签页
│   │   │   ├── index.tsx   # 主页（费用记录）
│   │   │   ├── expense.tsx # 支出明细
│   │   │   ├── chart.tsx   # 图表统计
│   │   │   └── user.tsx    # 用户页面
│   │   ├── _layout.tsx     # 根布局组件
│   │   └── modal.tsx       # 模态框组件
│   ├── components/         # 可复用UI组件
│   ├── constants/          # 常量定义
│   ├── assets/             # 静态资源
│   └── utils/              # 工具函数
├── global.css              # 全局样式
├── app.json                # Expo 应用配置
├── package.json            # 项目依赖
└── tsconfig.json           # TypeScript 配置
```

## 页面功能

### 主要页面

1. **首页 (Home)** - 快速记录各种消费支出
   - 支持多种分类（吃、喝、玩、乐等）
   - 便捷的弹窗录入界面

2. **支出明细 (Expense)** - 查看详细支出记录

3. **图表统计 (Chart)** - 数据可视化展示

4. **用户页面 (User)** - 个人信息及设置

### 特色功能

- 自定义图标字体 (IconFont)
- 日期时间选择器
- 下拉选择组件
- 模态框交互

## 安装与运行

1. **安装依赖**

   ```bash
   npm install
   # 或
   yarn install
   ```

2. **启动应用**
   ```bash
   # 启动开发服务器
   npm start
   # 或分别启动不同平台
   npm run android  # Android
   npm run ios      # iOS
   npm run web      # Web
   ```

## 开发说明

### 添加新图标

项目中使用了自定义图标字体，可以通过以下步骤添加新图标：

1. 在 iconfont 平台上传 SVG 图标
2. 更新 `src/assets/iconfont/` 目录下的相关文件
3. 在 `src/components/IconFont.tsx` 中添加新的图标映射

### 组件库

项目提供了多个可复用的 UI 组件：

- `CommonDateTime`: 日期时间选择器
- `CommonSelect`: 下拉选择组件
- `Themed`: 支持主题切换的文本和视图组件

## 项目配置

- **Expo 版本**: 55.0.23
- **React Native 版本**: 0.83.6
- **React 版本**: 19.2.0
- **TypeScript 版本**: ~5.9.2
- **NativeWind**: v4.2.3 (用于 Tailwind CSS 支持)

## 依赖说明

- `@expo/vector-icons`: 图标库
- `@react-native-community/datetimepicker`: 日期时间选择器
- `expo-router`: 文件系统路由
- `nativewind`: Tailwind CSS for React Native
- `react-native-gesture-handler`: 手势处理
- `react-native-reanimated`: 高性能动画

## 构建与发布

使用 Expo 提供的工具进行构建和发布：

```bash
# 构建应用
npx expo run:android  # 本地构建 Android
npx expo run:ios      # 本地构建 iOS

# 或使用 EAS 构建服务
npx expo prebuild     # 生成原生配置
eas build --platform android  # 云端构建
```

## 贡献

欢迎提交 Issue 和 Pull Request 来改进此项目。

## 许可证

[MIT License](LICENSE)
