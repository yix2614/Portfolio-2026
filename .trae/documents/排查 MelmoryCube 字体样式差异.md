## 问题定位
- 目前的 preset 样式只设置了 `--framer-*` 变量，但原先由 RichText 组件把这些变量映射成真实的 `font-size/color/line-height` 等
- 替换成原生 h1/h4 后，这些变量未被消费，导致字号与颜色出现偏差
- 另外 h1/h4 默认 margin 也可能造成视觉差异

## 修复方案
- 在组件注入的 css3 中补充基础规则：
  - `.framer-styles-preset-1nr15yr` 与 `.framer-styles-preset-1g780v8` 使用 `var(--framer-*)` 映射到真实样式
  - 增加 h1/h4 的 `margin: 0` 与 `padding: 0` 以贴近 RichText 默认样式
- 保持现有 className 作用域不变，确保只影响该组件

## 验证方式
- 重新启动/热更新页面，检查标题与副标题的颜色和字号是否与原版一致
- 对比旧版截图或肉眼确认视觉一致

我将按以上步骤修改并验证。