## 初步结论
箭头错位和 hover 瑕疵通常不是“样式文件缺少”，而是以下运行时逻辑与 DOM 结构没有对齐：
- hover 类名是否正确挂到 **有对应 CSS 选择器的根节点**（例如 .framer-rBzb1.framer-v-xxx.hover）
- 变体与 hover 组合是否按 unframer 规则计算（base+hover 叠加）
- SVG/箭头容器的 DOM 结构与 className 是否与样式规则一致

## 排查与修复计划
1. **定位箭头元素与样式来源**
   - 在 ProjectMenu/ProjectCard 的 css 数组里定位控制箭头位置的 class（例如 .framer-qtggk、.framer-7wl9r5-container 等）
   - 对照 JSX 中的 className 与层级，确认样式是否命中

2. **核对 hover 触发链路**
   - 检查 hover 相关 CSS 选择器是否依赖 `.hover` 类
   - 对照 useVariantState 返回的 classNames 与 gestureHandlers 绑定的节点是否一致
   - 必要时补齐：hover class 应挂在与 CSS 选择器一致的根节点

3. **核对 SVG/箭头容器的 DOM 结构**
   - 确认 SVG 外层容器是否具备正确的尺寸与定位样式
   - 若缺失 className 或结构（如容器/内部 img），按 unframer 结构补齐

4. **逐块验证**
   - 每修复一处，预览比对箭头对齐和 hover 状态，确保恢复一致

我会按这个流程逐项定位并修复，直到箭头位置与 hover 效果完全一致。