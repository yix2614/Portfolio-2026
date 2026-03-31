## 结论
ProjectMenu 里确实有重复：当前是“每张卡片 + 每段 spacer + 每段动画容器”都被复制粘贴生成。要去重，需要把卡片配置抽成数据数组，用 map 统一渲染。

## 方案
1. **提取卡片数据结构**
   - 把每张卡片的 props（标题、描述、图片、视频、variant、link 等）整理为一个数据数组（可放到 data/projects.ts 新增配置）

2. **抽取渲染函数**
   - 在 ProjectMenu 中写一个 `renderProjectCard(item, index)`，负责包一层 ComponentViewportProvider + SmartComponentScopedContainerWithFX
   - spacer（30%/40%）也用数组或规则统一渲染，避免重复块

3. **替换重复 JSX**
   - 用 `projects.map(...)` 替换 9 段硬编码实例
   - 保持 layoutId/nodeId 的稳定性（映射到固定 id 或由数据提供）

4. **验证一致性**
   - 对比 UI 与交互（hover/动画/滚动位置）是否一致
   - 如有偏差，补回必要的单卡特殊值（例如不同 transition/variant）

如果你确认，我就开始做数据提取与 ProjectMenu 的去重重构，并保持 UI 一模一样。