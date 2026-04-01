
import './index.css'
import './styles/theme.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import VibeCodingPage from './vibe-coding/VibeCodingPage'
import TiktokWebPage from './tiktokweb/TiktokWebPage'
import { applyTheme, getInitialTheme } from './utils/theme'
import { Analytics } from '@vercel/analytics/react'

const favicon32 = new URL('../favicon_io/favicon-32x32.png', import.meta.url).href
const favicon16 = new URL('../favicon_io/favicon-16x16.png', import.meta.url).href
const appleTouchIcon = new URL('../favicon_io/apple-touch-icon.png', import.meta.url).href
const webManifest = new URL('../favicon_io/site.webmanifest', import.meta.url).href
const faviconIco = new URL('../favicon_io/favicon.ico', import.meta.url).href

const ensureLink = (selector: string, rel: string) => {
  const existing = document.querySelector<HTMLLinkElement>(selector)
  if (existing) {
    return existing
  }
  const link = document.createElement('link')
  link.rel = rel
  document.head.appendChild(link)
  return link
}

const iconIco = ensureLink('link[rel="icon"]:not([sizes])', 'icon')
iconIco.href = faviconIco
const icon32 = ensureLink('link[rel="icon"][sizes="32x32"]', 'icon')
icon32.type = 'image/png'
icon32.sizes = '32x32'
icon32.href = favicon32
const icon16 = ensureLink('link[rel="icon"][sizes="16x16"]', 'icon')
icon16.type = 'image/png'
icon16.sizes = '16x16'
icon16.href = favicon16
ensureLink('link[rel="apple-touch-icon"]', 'apple-touch-icon').href = appleTouchIcon
ensureLink('link[rel="manifest"]', 'manifest').href = webManifest

// Initialize theme before rendering
applyTheme(getInitialTheme());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project" element={<App />} />
        <Route path="/vibe-coding" element={<VibeCodingPage />} />
        <Route path="/tiktokweb" element={<TiktokWebPage />} />
      </Routes>
    </BrowserRouter>
    <Analytics />
  </>
)
