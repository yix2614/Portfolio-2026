## 目标
- 把 MelmoryCube.styles.ts 改成与 BioProfile.styles.ts 一致的样式对象形式
- 组件不再注入 CSS 字符串，改为 style props

## 调整方案
- 在 MelmoryCube.styles.ts 中导出 `melmoryCubeStyles` 对象（CSSProperties）
- 将现有 CSS 规则拆分为语义化键（root/body/hero/card/award/awardImage/awardIcon/background/moon/cta/ctaIcon/text/title/subtitle/titleText/subtitleText/svg）
- 更新 MelmoryCube.tsx 使用 `style={melmoryCubeStyles.xxx}`，必要时保留少量 className（如果确实需要）
- 移除 style 注入逻辑与 `melmoryCubeStyleId/melmoryCubeStyles` 字符串

## 校验
- 检查类型无报错
- 确认页面效果一致

我会按以上步骤执行。