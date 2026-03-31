## 根因定位
- `AsciiScene` 的 `useEffect` 依赖 `onAspectRatio`。
- 目前父组件传入的是内联函数 `(ratio) => handleAspectRatio(currentSlide.videoUrl, ratio)`，每次 hero/card 切换都会生成新函数，导致 `useEffect` 重新执行，旧视频被清理并重建，所以播放被打断。
- 代码位置：
  - `useEffect` 依赖： [VibeCodingPage.tsx](file:///Users/bytedance/Desktop/tryout/src/vibe-coding/VibeCodingPage.tsx#L131-L318)
  - 传入内联回调： [VibeCodingPage.tsx](file:///Users/bytedance/Desktop/tryout/src/vibe-coding/VibeCodingPage.tsx#L760-L787)

## 修复方案
1. 让 `onAspectRatio` 保持稳定：
   - 用 `useCallback` 创建基于 `videoUrl` 的稳定回调（只在切换视频时改变，不在 hero/card 切换时改变）。
2. 或者将 `onAspectRatio` 存到 `useRef`，让 `useEffect` 只依赖 `videoUrl`，避免每次 hero/card 切换重建视频。
3. 保持 `AsciiScene` 的 `useEffect` 只在 `videoUrl` 变化时重跑。

## 预期结果
- Hero ↔ Card 切换时 ASCII 视频连续播放，不再被重置。

确认后我就按方案改代码。