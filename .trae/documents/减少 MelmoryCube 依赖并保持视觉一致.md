## 目标与约束
- 保持界面与当前视觉效果一致（无新增/丢失样式）
- 最大限度移除对 unframer 的运行时依赖

## 依赖审计
- 逐项扫描当前 import 的 unframer API 在文件中的使用位置
- 标记可直接替换为原生 React/HTML/CSS 的部分（如 motion.div、Image、RichText、cx）

## 替换策略
- motion.div/LayoutGroup：替换为 div/Fragment，移除 motion 依赖
- Image：替换为 img + style/尺寸/加载属性，保持相同布局与资源 URL
- RichText：替换为 h1/h4 + className + 样式预设的类名
- cx：用简单拼接函数替代（仅保留实际用到的类名）
- ComponentViewportProvider/useComponentViewport/getLoadingLazyAtYPosition：若仅用于 lazy-loading 计算，改为固定 loading="lazy" 与原本 sizes/srcSet，保持视觉一致
- withCSS/addFonts/getFonts/getFontsFromSharedStyle：改为静态 CSS 注入或移到全局样式，保留作用域 className 以保证样式不变

## 实施步骤
1. 在 MelmoryCube.tsx 内部逐项替换 unframer 组件与工具函数
2. 精简 import 列表，仅保留 React 与必要的本地辅助函数
3. 校验 JSX 结构与 className 保持一致，确保布局不变
4. 运行类型检查与页面预览确认视觉一致

如果确认，我将按以上步骤执行并提交具体改动。