## 当前依赖清单
- 运行时：ProjectMenu.tsx 大量 import 自 unframer（LayoutGroup/motion/ResolveLinks/Image/RichText/Video/Font/RenderTarget 等）
- 样式：ProjectMenu.css 顶部 @import unframer/styles/reset.css 与 unframer/styles/framer.css
- 基础：React（react/jsx-runtime）

## 改造方向
- 移除所有 unframer import 与运行时依赖
- 用自研组件替代：Link/Image/RichText/Video、motion/variant/hover 逻辑
- 保留所有外部链接与资源 URL 不变
- 保留现有 CSS 变量与类名，确保像素级布局

## 计划
1. 梳理 ProjectMenu 中的关键功能依赖
   - 卡片布局结构、hover variants、视频播放、图片渲染
2. 抽取数据配置
   - 将所有链接/图片/视频/圆角/文案整理到 project-menu/data
3. 重写组件
   - ProjectMenu/ProjectCard/Divider 用纯 React + framer-motion
   - 删除 unframer 专用属性并对齐 className
4. 样式对齐
   - 复制必要 reset 与基础样式到本地，移除 @import unframer
5. 验证
   - 对比 UI/交互与当前一致，确保外链可用

你确认后，我开始逐步重写并替换。