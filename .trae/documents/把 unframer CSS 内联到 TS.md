## 结论
可以把两份 CSS 内容直接内联进一个 TS 文件（通过注入 <style>），然后删除两个 CSS 文件，达到“code 整合进去”的效果。

## 计划
1. 创建/改造 styles/unframer.ts
   - 把 unframer-reset.css 与 unframer-framer.css 内容合并为一个字符串
   - 在模块初始化时注入到 <head> 的 <style> 标签
2. 移除对 CSS 文件的 import
   - 删除 styles/unframer.ts 中的 import
   - ProjectMenu 仍只保留 import "./styles/unframer" 的入口不变
3. 删除旧 CSS 文件
   - 删除 unframer-reset.css 与 unframer-framer.css
4. 验证
   - 预览页面，确保样式 1:1 不变

我会直接执行上述步骤，把 CSS 全部整合进 TS。