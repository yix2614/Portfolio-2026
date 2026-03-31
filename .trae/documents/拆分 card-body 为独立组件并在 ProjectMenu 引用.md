## 目标理解
- 把当前 card-body（原 framer-12s4jfu / 现在 className 为 card-body）拆成独立组件。
- 新建一个对应的样式 TS 文件。
- 该组件命名为 **MemoryCube**（作为变体 1），并在 ProjectMenu 中引用。
- 保留现有 card-body 结构不变，同时在菜单最前新增一张卡。

## 具体方案
1. **定位 card-body 结构**
   - 在 ProjectCard 中锁定 card-body 的 JSX 片段，作为 MemoryCube 组件基础。

2. **新建 MemoryCube 组件**
   - 抽出 card-body 的 JSX 到 `MemoryCube.tsx`。
   - 通过 props 传入需要的图片、文案、layoutDependency 等依赖。

3. **新建样式文件**
   - 新建 `MemoryCube.styles.ts`，只包含该组件所需样式（从 ProjectCard.styles.ts 迁移）。

4. **ProjectMenu 引用**
   - 在 ProjectMenu 中新增一张卡，使用 MemoryCube 组件作为第一张。
   - 保留原有卡片结构不变（原 framer-12s4jfu / card-body 不动）。

5. **验证**
   - 检查 UI 是否一致，且新卡置于第一位。

确认后我会按此方案执行。