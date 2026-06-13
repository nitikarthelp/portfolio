import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@google/model-viewer'
import './index.css'
import App from './App'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scroll, synced with GSAP ScrollTrigger
const lenis = new Lenis({ lerp: 0.12 })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
