## 审查范围
- 核心页面与入口： [index.html](file:///Users/bytedance/Desktop/tryout/index.html), [main.tsx](file:///Users/bytedance/Desktop/tryout/src/main.tsx), [App.tsx](file:///Users/bytedance/Desktop/tryout/src/App.tsx)
- 组件与样式：
  - 所有 UI 组件：src/components/**/*.tsx（包括 [HorizontalScrollSection.tsx](file:///Users/bytedance/Desktop/tryout/src/components/HorizontalScrollSection.tsx), [MelmoryCube.tsx](file:///Users/bytedance/Desktop/tryout/src/components/MelmoryCube.tsx), [ProjectOverlay.tsx](file:///Users/bytedance/Desktop/tryout/src/components/ProjectOverlay.tsx) 等）
  - 组件样式：src/components/**/*.styles.ts（例如 [MelmoryCube.styles.ts](file:///Users/bytedance/Desktop/tryout/src/components/MelmoryCube.styles.ts)）
  - 全局样式： [index.css](file:///Users/bytedance/Desktop/tryout/src/index.css), [theme.css](file:///Users/bytedance/Desktop/tryout/src/styles/theme.css)

## 审查方法
1. 拉取最新 Web Interface Guidelines 规则
2. 按规则逐条检查上述文件，覆盖：可访问性、键盘可操作性、焦点管理、动效与性能、布局与对齐、链接语义、表单与输入、滚动与粘性容器、色彩与对比度、SVG/图片处理等
3. 按指南要求输出精简的 file:line 格式问题列表，并附上最小修复建议

## 交付内容
- 规范化问题清单（file:line + 简述 + 规则引用）
- 优先级排序（高/中/低）与建议修复
- 需要代码变更的具体位置与改动说明

## 后续（待你确认后执行）
- 可快速修复：
  - 为交互元素添加可见 focus ring（:focus-visible）
  - 为动效提供 prefers-reduced-motion 变体，避免 transition: all
  - 链接使用 <a>/<Link> 而非 <div> 导航；为图标按钮补充可访问名称
  - 横向滚动容器设置 overscroll-behavior 与键盘支持
  - 图片 alt 文本与命名，命中最小点击区域建议

如果你确认范围无误，我将立即运行审查并给出问题清单与修复建议。