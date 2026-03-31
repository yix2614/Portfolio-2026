## 解释
现在 UI 不一致，是因为原来的样式/字体/图片行为来自 project-menu 的生成资源，而我们移除了它。新的 MelmoryCube 不应依赖 project-menu，所以需要把必要的样式和行为“本地化”。

## 方案（零 project-menu 依赖）
1. **本地化样式与字体**
   - 在 src/components（或 src/styles）新建独立样式文件，包含 MelmoryCube 所需的颜色 token 与字体声明。
   - 只保留 MelmoryCube 用到的 token，不引入 project-menu 的 CSS。

2. **本地化 Image 行为**
   - 在 src/components 新建一个轻量 Image 组件（支持 imageClassName/alt/objectFit），供 MelmoryCube 使用。

3. **完善 MelmoryCube 结构与 hover 交互**
   - 根据当前设计把 hover/奖牌层/视频层逻辑完整补齐，确保与目标 UI 一致。

4. **验证**
   - 预览对比视觉与交互一致性，确保无 project-menu 引用。

确认后我按这个方案执行。