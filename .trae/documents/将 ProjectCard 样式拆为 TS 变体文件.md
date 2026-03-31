## 目标理解
你希望 ProjectCard 的样式不要散在组件里，而是放到**一个 TS 文件**里统一管理（包含所有变体），且不拆成多个文件。

## 方案概述
- 新建一个 `ProjectCard.styles.ts`，里面集中导出：
  - `baseStyles`: 通用样式规则
  - `variantStyles`: 各变体差异规则
  - `interactionStyles`: hover 等交互规则
- 在 `ProjectCard.tsx` 中只保留结构与逻辑，样式通过导入的 TS 样式数组注入。

## 具体步骤
1. **抽离样式**
   - 把当前 `css2/css3/css4` 里的所有规则移到 `ProjectCard.styles.ts`。
   - 用数组分组（base/variant/interaction）以便阅读。
2. **组件改造**
   - 在 `ProjectCard.tsx` 中移除内联样式数组定义。
   - 导入 `cardStyles`（由 `baseStyles +_toggle +variantStyles` 组成）并传给 `withCSS`。
3. **命名清理**
   - 统一样式文件的 export 命名，确保直观易懂。
4. **验证**
   - 预览确认 UI/hover 与现在完全一致。

确认后我就开始动手抽离并完成结构清理。