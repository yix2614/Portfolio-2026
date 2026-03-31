## 结论
ProjectMenu 目前已替换成自研 runtime，但该 runtime 只做了最小兜底，很多 Framer/Unframer 关键行为被空实现，导致样式/交互/动画不完整，从而看起来“全坏”。

## 处理策略
- 方案 A（最快恢复）：临时恢复 unframer 运行时，让 UI 立即回到正确状态；再逐步替换为自研实现。
- 方案 B（完全自研）：把 ProjectMenu/ProjectCard/Divider 重写为纯 React + framer-motion，彻底移除 unframer 依赖，保持外链不变。

## 推荐方案（B，彻底自研）
1. 盘点当前 broken 的关键点
   - 对比 ProjectMenu.tsx 内的 variant/class、hover、video、image、layout 逻辑
   - 找出 runtime 中缺失的关键能力（motion/variants、Image/Video、layout sizing）
2. 抽取数据与外链
   - 将卡片/视频/图片/链接配置整理到 project-menu/data
   - 保持所有外部链接与资源 URL 不变
3. 重写核心组件
   - 以 project-menu/components 重写 ProjectMenu、ProjectCard、ProjectDivider
   - 只保留必要 props 与类名，删除 unframer 专用属性
   - 用 framer-motion 实现 hover/appear/scroll 动画
4. 样式与布局对齐
   - 复用现有 CSS 变量和类名
   - 对齐尺寸、间距、圆角、层级与遮罩逻辑
5. 验证
   - 确认首页与 ProjectMenu 均可正常显示
   - 外链一致、hover/动画一致、媒体切换正常

如果你同意，我就直接按方案 B 开始重构并修复显示。