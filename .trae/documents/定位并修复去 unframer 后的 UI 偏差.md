## 结论
目前 UI 走样的根因是：现在的本地 runtime 是“简化版”，与 unframer 真正的运行时行为差距较大（尤其是 CSS 注入、变体/交互、字体加载、motion 行为）。我无法直接看到“去 unframer 之前的版本”，但我可以把当前 runtime 与 node_modules/unframer 的实现逐项对比并补齐。

## 关键差异（当前可见）
- withCSS：当前只做一次性注入，未按 props/RenderTarget 动态处理，也没有 SSR 逻辑（对比 unframer 的 withCSS）
- useVariantState：当前只处理 hover，缺少 pressed/error/循环等完整逻辑
- fontStore/addFonts：当前是空实现，字体加载逻辑缺失
- motion/motionValue/animate：当前是简化实现，可能影响动画/变体切换

## 计划
1. **对照实现**
   - 逐项对比 runtime.tsx 与 unframer/src/framer.js 中的核心实现（withCSS / useVariantState / motion / fontStore）
2. **补齐功能（小步替换）**
   - 先修复 withCSS 的动态注入与作用域逻辑
   - 再补齐 useVariantState 的完整交互（hover/press/variant 切换）
   - 最后补齐 fontStore/addFonts 与 motionValue/animate 行为
3. **逐步验证**
   - 每替换一步就预览对比，确保像素级一致，不一致立即回退定位

如果你确认，我就按上述顺序开始逐项补齐并对齐 UI。