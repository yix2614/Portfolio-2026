## 当前问题原因
- gallary 目前锚在 VIBE CODING 文案右侧并向右偏移，父级整体 `overflow: hidden`，一旦超出视口就被裁掉，所以看不到。
- 下滑引导组件现在只在 [App.tsx](file:///Users/bytedance/Desktop/tryout/src/App.tsx#L117-L147) 里，不在 VibeCodingPage 内，因此进入 Vibe Coding 页面后看不到。

## 修复方案
1. 调整 gallary 的定位方式：让它锚在“VIBE CODING”右上角但**不越界**，改为 `right: 0` + 向上位移（不再向右溢出），确保在视口内可见。
2. 保留 14px / serif / 低透明度的样式。
3. 在 VibeCodingPage 的 Hero 模式内补回下滑引导（复用 App.tsx 的样式/结构），用绝对定位放在右下角，避免影响现有布局。

## 验证方式
- Hero 模式下确认 gallary 可见并贴在 VIBE CODING 右上。
- Hero 模式下右下角出现下滑引导。

确认后我会按以上方案改代码。