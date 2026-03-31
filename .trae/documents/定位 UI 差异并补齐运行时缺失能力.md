## 结论
UI 仍不对主要不是样式文件的问题，而是运行时能力仍有缺失/简化：这些是 JS 逻辑，不能用 CSS 解决。

## 可能缺失点（已对照现状）
- **RichText 运行时**：未处理 `text/verticalAlignment/stylesPresetsClassNames` 等，可能导致文本排版/高度偏差
- **Image 运行时**：未生成与 Framer 一致的结构/类名（如 `framer-na95nj`、wrapper 绝对定位），影响裁剪/布局
- **Transform/FX/动画**：`__framer__styleTransformEffectEnabled`、`__framer__transformTargets` 等逻辑未生效
- **布局测量**：`ComponentViewportProvider` 如果未完整包裹，`useComponentViewport` 的尺寸会错

## 外部依赖
- 字体与图片仍来自 `framerusercontent.com`，网络不可用时会导致字体/图片缺失

## 修复计划
1. **对照 unframer 的 RichText/Image 结构**，补齐本地实现（类名、结构、关键 props）
2. **补齐 motion/FX 逻辑**，让 transform 目标与 hover/press 过渡按 Framer 行为执行
3. **核对 ComponentViewportProvider 的使用范围**，保证视口尺寸计算一致
4. **逐项回归验证**（字体、图片、hover、布局尺寸、滚动视频）确保像素级一致

我会按上面的顺序逐项补齐并验证，直到 UI 恢复一致。