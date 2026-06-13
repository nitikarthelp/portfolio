// Lets TypeScript/JSX accept the <model-viewer> custom element.
import type { HTMLAttributes, Ref } from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': HTMLAttributes<HTMLElement> & {
        ref?: Ref<HTMLElement>
        src?: string
        alt?: string
        'auto-rotate'?: boolean
        'camera-controls'?: boolean
        'disable-zoom'?: boolean
        'shadow-intensity'?: string
        exposure?: string
        'animation-name'?: string
        autoplay?: boolean
        'interaction-prompt'?: string
        'camera-orbit'?: string
        'environment-image'?: string
        'tone-mapping'?: string
      }
    }
  }
}
