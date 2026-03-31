## 目标
- 完全移除 unframer 运行时依赖
- UI 与交互保持像素级一致
- 逐步替换，任何偏差立即回退修正

## 基线确认
- 以当前 ProjectMenu 预览为唯一对照基线
- 记录关键交互状态（hover/视频/链接）

## 替换顺序（低风险→高风险）
1. **Link 组件**：用自研 Link 替代 unframer Link，消除 React 19 警告
2. **Image/RichText**：逐个替换为自研渲染，保持样式与 DOM 结构一致
3. **withCSS/字体加载**：本地化样式注入与字体逻辑
4. **变体与动画**：实现与 unframer 兼容的 variant/gesture/transition 行为
5. **LayoutGroup/motion**：替换布局与 motion 管理

## 实施方式
- 只在 unframer-adapter.ts 中替换单个功能点
- 每替换一步就进行 UI 对比与交互验证
- 若出现像素偏差，立即定位并修复后再继续

## 验证
- 预览对比：主布局、hover、文本、媒体、链接行为
- 控制台无阻断错误

我会按这个顺序执行，保证每一步都与当前 UI 一致。