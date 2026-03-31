## 先回答你的问题
MelmoryCube **不需要引用 project-menu**。目前它只引用 `unframer`（运行时组件库）和自己的样式文件。之所以 UI 不一致，是因为之前 ProjectMenu.css 里有全局变量/字体/基础规则，但我已经不再让 App 引用它，所以样式来源缺失了，这会导致视觉差异。

## 修正方案（完全不引用 project-menu）
1. **本地化必要全局样式**
   - 把需要的 token/字体/基础规则迁移到新的 `src/styles/unframer-tokens.css`。
   - App 只引这个新文件，不碰 project-menu 目录。

2. **组件内部完整化**
   - MelmoryCube 内部补齐缺失的图片位/hover 层规则（只用组件自己的样式）。
   - 如果需要专用 Image 行为，就在 components 下新增 `CustomImage`，同样不依赖 project-menu。

3. **验证 UI 一致**
   - 预览对比：文字、颜色、布局、hover 与原卡一致。

确认后我按以上方式修复。