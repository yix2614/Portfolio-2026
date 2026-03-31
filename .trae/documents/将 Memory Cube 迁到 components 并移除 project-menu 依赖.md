## 现状与结论
- 当前 App 仍在引用 project-menu（见 App.tsx 第 16-17 行），因此“app 不再用 project-menu”需要把这些引用移除。
- 你要的“melmory cube”组件需要放在 src/components 内，并保持 UI/交互与现在一致。

## 实施方案
1. **提取组件**
   - 参考 social2.tsx 的写法和结构风格，在 src/components 新建 `MelmoryCube.tsx`。
   - 以当前 MemoryCube 结构为基准，保持布局、hover、视频、文字样式一致。

2. **样式独立**
   - 新建 `MelmoryCube.styles.ts` 放置样式数组，集中管理（不在 project-menu 内）。
   - 确保 className 与结构一致，hover 逻辑完全一致。

3. **App 改造**
   - App.tsx 移除 project-menu 的 import 与样式引用。
   - 改为引用新组件 `MelmoryCube` 并插入对应位置。

4. **清理依赖**
   - 检查 app 层是否还有 project-menu 相关 import，全部移除。

5. **验证一致性**
   - 运行预览，确认 UI/交互与原 card 的 Memory Cube 一致。

确认后我会按以上步骤执行。