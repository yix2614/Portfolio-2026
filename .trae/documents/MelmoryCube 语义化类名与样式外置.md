## 目标
- 移除所有 framer 命名类
- 使用语义化类名
- 将组件内样式全部移到样式文件中，效果保持一致

## 改动范围
- MelmoryCube.tsx：替换 className、移除内联样式与样式注入逻辑
- 新增/更新样式文件（建议使用 MelmoryCube.css 或复用 MelmoryCube.styles.ts）

## 实施步骤
1. 定义语义化类名映射（root/body/hero/award/bg/moon/cta/text/title/subtitle 等）
2. 在样式文件中写入对应 CSS 规则（包含字体、颜色、尺寸、object-fit、圆角、布局）
3. 更新 JSX 使用新类名，移除 framer 相关 class 与 css3/fontFaceCss/useInjectStyles
4. 确认字体与颜色来自 theme.css，确保视觉一致
5. 运行类型检查与页面验证

如果确认，我会按上述步骤修改并提交变更。