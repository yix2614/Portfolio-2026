## 目标
- 保持当前 ProjectMenu 的 UI 与交互 1:1 不变
- 拆分成可维护的 TS 文件结构（可放入新文件夹）

## 现状核对
- 读取现有 ProjectMenu.tsx 与其内嵌的 card/divider 组件与样式引用
- 确认依赖（unframer、framer-motion、样式 token、字体）与入口引用方式

## 拆分方案
- 新建独立文件夹（如 src/framer-project/）
- 将生成代码拆成：
  - index.tsx：对外导出的 ProjectMenu 组件
  - components/ProjectCard.tsx：卡片组件
  - components/ProjectDivider.tsx：分割组件
  - data/projects.ts：项目数据与资源映射
  - styles/ProjectMenu.css：原始 CSS 与变量
  - types.ts：共享类型定义
- 保持组件内部逻辑与 props 完全一致，仅做“文件拆分”与“类型补全”

## 迁移与接入
- App.tsx 仅替换 import 路径，不改布局
- 保持 locale 传参与运行行为一致

## 验证
- 运行 dev server，肉眼对比交互与动画
- 确认无 TS 报错与样式丢失

如果你确认该方案，我会按此拆分并交付。