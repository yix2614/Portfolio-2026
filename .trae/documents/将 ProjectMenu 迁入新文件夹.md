## 结论
- 你说得对：既然已经新建 project-menu 文件夹，components 里的 ProjectMenu 应该移除，避免重复与混乱。

## 方案
- 把 src/components/ProjectMenu.tsx 原文件内容完整迁移到 src/project-menu/ProjectMenu.tsx（保持 1:1 逻辑与输出）。
- 更新 project-menu 的导出路径与索引（index.tsx / components/ProjectCard.tsx / ProjectDivider.tsx）指向新位置。
- 更新 App.tsx 的 import 路径（如需）并保持现有布局不变。
- 删除 src/components/ProjectMenu.tsx（避免重复）。
- 保留现有 CSS 引用到 src/project-menu/styles/ProjectMenu.css。

## 验证
- 运行/保持 dev server，确保无编译错误、交互与 UI 仍一致。

确认后我就直接执行迁移与清理。