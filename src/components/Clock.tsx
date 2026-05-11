import React, { useEffect, useState } from 'react'

// 所有 SVG 均来自 Figma j5l1Y9LTiFaqRPV2LZca5Q node 1852-77759 原始导出
// 表盘拆为子节点 SVG 分别导出后按 Figma 坐标组合；三只指针独立旋转

type Props = { size?: number | string }

const BOX = 740 // Figma 整体画布 740×740
const CENTER = BOX / 2 // 370

// ============ 表盘每层 SVG 在 740 画布里的放置 ============
// 每张导出 SVG 的尺寸比 Figma logical 尺寸大一圈（Figma 包含 filter 阴影外延）
// 全部居中在表盘中心；数字节点是特例
const DIAL = {
  outer: { src: '/new-clock/dial-outer.svg', w: 745, h: 745, cx: CENTER, cy: CENTER },
  middle: { src: '/new-clock/dial-middle.svg', w: 702, h: 702, cx: CENTER, cy: CENTER },
  inner: { src: '/new-clock/dial-inner.svg', w: 664, h: 664, cx: CENTER, cy: CENTER },
  ticks: { src: '/new-clock/dial-ticks.svg', w: 616, h: 616, cx: CENTER, cy: CENTER },
  // Figma: Time 530×548 @ (104, 96)，导出 530×548（无 padding）
  numbers: { src: '/new-clock/dial-numbers.svg', w: 530, h: 548, cx: 104 + 530 / 2, cy: 96 + 548 / 2 },
}

// ============ 指针（SVG 内读出的真实 hub 坐标 + 针尖方向初始角） ============
// arm-black.svg:  viewBox 443×415, hub @ (236.958, 266.316)，针尖朝右上
//   默认针体与 12 点方向的夹角 = -35.5°（SVG 坐标系）
//   所以实际旋转角 = timeAngle - 35.5°
//
// arm-yellow.svg: viewBox 304×258, hub @ (65.4862, 56.5457)，针尖朝右下
//   默认针体与 12 点方向的夹角 = +129.3°
//   所以实际旋转角 = timeAngle - 129.3°
//
// arm-white.svg:  viewBox 166×166, 圆心 @ (67, 81) — 无方向性，不旋转
//
// 设计稿上两根黑指针是"同一张图"（长度相同），表盘需要显示时针/分针需要"复用"：
//   · 分针用完整 Black Arm
//   · 时针用缩短 70%，同一张图 scale=0.7
//   为了时针视觉上短一截，整体缩放后 hub 坐标也按比例
// arm-black.svg 内同时画了"时针 (path3)"和"分针 (path1)"两根针，共享同一个 hub。
// 我们用一条经过 hub、斜率 -1 的直线 y = x + (hubY - hubX) ≈ y = x + 29.358
// 把 SVG 切成两半：
//   · 线下方（屏幕左下区）→ 时针所在半（path3 端，针尖时钟角 ≈ +240°）
//   · 线上方（屏幕右上区）→ 分针所在半（path1 端，针尖时钟角 ≈ +35.5°）
// 这样同一张 SVG 被裁出两个独立图层，可分别旋转。
//
// path3 端 (19.3489, 391.374) 相对 hub (236.958, 266.316) = (-217.6, 125.06)
//   时钟角 = atan2(-217.6, -125.06) ≈ -119.87°（即 +240.13°）
const BLACK_HOUR = {
  src: '/new-clock/arm-black.svg',
  w: 443,
  h: 415,
  hubX: 236.958,
  hubY: 266.316,
  initAngle: 240.13, // path3 端
  clipId: 'black-hour-clip',
  // 线下方多边形：(0, 29.36) → (385.64, 415) → (0, 415)
  clipPoints: '0,29.358 385.642,415 0,415',
}
const BLACK_MIN = {
  src: '/new-clock/arm-black.svg',
  w: 443,
  h: 415,
  hubX: 236.958,
  hubY: 266.316,
  initAngle: 35.5, // path1 端
  clipId: 'black-min-clip',
  // 线上方多边形：(0, 29.36) → (385.64, 415) → (443, 415) → (443, 0) → (0, 0)
  clipPoints: '0,29.358 385.642,415 443,415 443,0 0,0',
}
const YELLOW = {
  src: '/new-clock/arm-yellow.svg',
  w: 304,
  h: 258,
  hubX: 65.4862,
  hubY: 56.5457,
  initAngle: 129.3,
}
const WHITE = {
  src: '/new-clock/arm-white.svg',
  w: 166,
  h: 166,
  hubX: 67,
  hubY: 81,
}

const Clock: React.FC<Props> = ({ size = 360 }) => {
  const [now, setNow] = useState(() => new Date())
  // ============ 主题（light/dark）===============
  // 不引入全局 token，仅在 Clock 组件内消费 html[data-theme]，并监听 themeChange 事件
  const getTheme = (): 'light' | 'dark' => {
    if (typeof document === 'undefined') return 'light'
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light'
  }
  const [theme, setTheme] = useState<'light' | 'dark'>(getTheme)
  useEffect(() => {
    const onChange = () => setTheme(getTheme())
    window.addEventListener('themeChange', onChange)
    // 兼容外部直接改 data-theme（无事件）
    const observer = new MutationObserver(onChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => {
      window.removeEventListener('themeChange', onChange)
      observer.disconnect()
    }
  }, [])

  // 跳秒：在每个整秒边界 tick 一次。第一次 timeout 对齐到下一整秒，之后用 1000ms interval。
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null
    const msToNextSec = 1000 - (Date.now() % 1000)
    const timeoutId = setTimeout(() => {
      setNow(new Date())
      intervalId = setInterval(() => setNow(new Date()), 1000)
    }, msToNextSec)
    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  // 美西 LA 时间（America/Los_Angeles）
  // 使用 sv-SE locale + 24h 制可拿到稳定的 "HH:mm:ss" 字符串
  const laStr = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'America/Los_Angeles',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)
  const [hStr, mStr, sStr] = laStr.split(':')
  const laHour = Number(hStr) % 24
  const laMin = Number(mStr)
  const laSec = Number(sStr ?? '0')
  const seconds = laSec + now.getMilliseconds() / 1000
  const minutes = laMin + seconds / 60
  const hours = (laHour % 12) + minutes / 60
  const hourAngle = hours * 30 // 0 = 指向 12
  const minAngle = minutes * 6
  // 跳秒（Deadbeat Seconds）：取整秒，每秒精准一跳，不做平滑插值
  const secAngle = Math.floor(seconds) * 6

  // 把一个指针 SVG：以 hub 对齐到 (CENTER, CENTER)，再以 (CENTER, CENTER) 为旋转中心旋转 rot
  // 用 <g> 包裹保证 transform 与 <image> 的几何顺序稳定
  // 如果传入 clipId，则在 SVG 局部坐标里只露出对应那一半（用于把双头针拆成时针/分针）
  const renderHand = (
    hand: { src: string; w: number; h: number; hubX: number; hubY: number; initAngle: number; clipId?: string },
    timeAngle: number,
    scale = 1,
    key?: string,
  ) => {
    const w = hand.w * scale
    const h = hand.h * scale
    const hubX = hand.hubX * scale
    const hubY = hand.hubY * scale
    const rot = timeAngle - hand.initAngle
    // 先把 hub 平移到原点 → 旋转 → 再平移到画布中心
    return (
      <g
        key={key}
        transform={`translate(${CENTER} ${CENTER}) rotate(${rot}) translate(${-hubX} ${-hubY})`}
      >
        <image
          href={hand.src}
          x={0}
          y={0}
          width={w}
          height={h}
          clipPath={hand.clipId ? `url(#${hand.clipId})` : undefined}
        />
      </g>
    )
  }

  const renderImage = (d: { src: string; w: number; h: number; cx: number; cy: number }) => (
    <image href={d.src} x={d.cx - d.w / 2} y={d.cy - d.h / 2} width={d.w} height={d.h} />
  )

  // 把指针拆成独立的 <svg> 层，便于外层 DOM 用 translateZ 叠不同 layer
  // 每个层的 svg 共用同一个 viewBox，叠加后视觉上等价于一张完整时钟
  const renderHandSvg = (
    hand: { src: string; w: number; h: number; hubX: number; hubY: number; initAngle: number; clipId?: string; clipPoints?: string },
    timeAngle: number,
  ) => (
    <svg viewBox={`0 0 ${BOX} ${BOX}`} width="100%" height="100%" style={{ display: 'block', position: 'absolute', inset: 0 }}>
      {hand.clipId && hand.clipPoints && (
        <defs>
          <clipPath id={hand.clipId}>
            <polygon points={hand.clipPoints} />
          </clipPath>
        </defs>
      )}
      {renderHand(hand, timeAngle, 1)}
    </svg>
  )

  return (
    <div style={{ width: size, height: size, aspectRatio: '1 / 1', position: 'relative', transformStyle: 'preserve-3d' }}>
      {/* 表盘层（最底）：包含表盘 + 中心装饰白圈
          所有内部层都设置 backface-visibility: hidden，避免外层 flip 翻到背面时
          这些子层因为 preserve-3d 仍然渲染出"镜像背面"覆盖到对面 face 上 */}
      <svg viewBox={`0 0 ${BOX} ${BOX}`} width="100%" height="100%" style={{ display: 'block', position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
        {/* 主题相关：dark 模式下用一个 filter 把浅色表盘整体变深，保持轮廓和阴影。
            指针/中央橘色 hub 不进入这个 filter，颜色保留原样。 */}
        <defs>
          <filter
            id="dial-dark-filter"
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            {/* 1) 反相 → 让浅色背景变成深色 */}
            <feColorMatrix
              type="matrix"
              values="-1 0 0 0 1
                      0 -1 0 0 1
                      0 0 -1 0 1
                      0 0  0 1 0"
            />
            {/* 2) 色相旋转 180° → 把反相后的颜色拉回原本的色相，但保留亮度反转的效果 */}
            <feColorMatrix type="hueRotate" values="180" />
            {/* 3) 轻微调暗，让整体落到深色 mode 应有的明度 */}
            <feComponentTransfer>
              <feFuncR type="linear" slope="0.85" />
              <feFuncG type="linear" slope="0.85" />
              <feFuncB type="linear" slope="0.9" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* 表盘由远到近：outer → middle → inner → ticks → numbers */}
        <g filter={theme === 'light' ? 'url(#dial-dark-filter)' : undefined}>
          {renderImage(DIAL.outer)}
          {renderImage(DIAL.middle)}
          {renderImage(DIAL.inner)}
          {renderImage(DIAL.ticks)}
          {renderImage(DIAL.numbers)}
        </g>

        {/* 中心 White Arm（装饰圆，在指针下方，hub 对齐到中心）—— light 下走调色 filter */}
        <g filter={theme === 'light' ? 'url(#dial-dark-filter)' : undefined}>
          <image
            href={WHITE.src}
            x={CENTER - WHITE.hubX}
            y={CENTER - WHITE.hubY}
            width={WHITE.w}
            height={WHITE.h}
          />
        </g>
      </svg>

      {/* 时针层 —— 比表盘略前 */}
      <div style={{ position: 'absolute', inset: 0, transform: 'translateZ(8px)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
        {renderHandSvg(BLACK_HOUR, hourAngle)}
      </div>

      {/* 分针层 —— 比时针更靠前 */}
      <div style={{ position: 'absolute', inset: 0, transform: 'translateZ(16px)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
        {renderHandSvg(BLACK_MIN, minAngle)}
      </div>

      {/* 秒针层 —— 最靠前 */}
      <div style={{ position: 'absolute', inset: 0, transform: 'translateZ(24px)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
        {renderHandSvg(YELLOW, secAngle)}
      </div>

      {/* 中心橘色 hub —— 与秒针同层，遮住所有指针根部；不再单独抬 z，避免和钟面错位 */}
      <div style={{ position: 'absolute', inset: 0, transform: 'translateZ(24px)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
        <svg viewBox={`0 0 ${BOX} ${BOX}`} width="100%" height="100%" style={{ display: 'block', position: 'absolute', inset: 0 }}>
          <defs>
            <mask id="hub-mask">
              <rect x="0" y="0" width={BOX} height={BOX} fill="black" />
              {/* 真实 hub 半径来自 SVG 内部 <circle r="39.0673">；109.89 只是带阴影的 bbox */}
              <circle cx={CENTER} cy={CENTER} r={39.0673} fill="white" />
            </mask>
          </defs>
          <g mask="url(#hub-mask)">
            <image
              href={YELLOW.src}
              x={CENTER - YELLOW.hubX}
              y={CENTER - YELLOW.hubY}
              width={YELLOW.w}
              height={YELLOW.h}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Clock
