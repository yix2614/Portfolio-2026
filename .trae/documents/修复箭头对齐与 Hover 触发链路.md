## 现状结论
箭头/hover 仍不对的关键原因之一是：ProjectCard 里 `enabledGestures` 为 `undefined`，导致 `useVariantState` 不会生成 hover 状态，因此依赖 `.hover` 的 CSS 完全不生效，箭头位置与 hover 位移规则也就不会触发。

## 影响点
- `.framer-rBzb1.framer-v-xxx.hover ...` 这类规则不会命中
- 依赖 `AIF0J8xQQ-hover` 等 variant 的样式不会激活
- 箭头相关绝对定位容器（如 `.framer-158b6xg/.framer-115rj5r-container`）在 hover 下的位移/尺寸不会生效

## 修复计划
1. **确认 hover 触发链**
   - 在 ProjectCard 中为每个 baseVariant 补齐 `enabledGestures` 的 hover 开关（对照 cycleOrder/variantClassNames）
2. **对齐 hover class 挂载节点**
   - 确保 `.hover` 被加到与 css4 选择器一致的根节点（`framer-rBzb1 framer-158pxd3`）
3. **验证箭头相关容器**
   - 针对 `.framer-qtggk / .framer-7wl9r5-container / .framer-1l0787q-container` 的 hover 位移与对齐进行逐个确认
4. **回归验证**
   - 对比 hover 前后箭头位置与动画是否一致

确认后我会先补齐 `enabledGestures` 并逐项验证 hover 规则是否生效。