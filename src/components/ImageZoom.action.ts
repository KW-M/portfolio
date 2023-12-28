import mediumZoom from 'medium-zoom'
import type { ZoomOptions } from 'medium-zoom'

export function attachZoom(image: HTMLElement, options: ZoomOptions) {
  const zoom = mediumZoom(options)
  zoom.attach(image)

  return {
    update(newOptions: ZoomOptions) {
      zoom.update(newOptions)
    },
    destroy() {
      zoom.detach()
    },
  }
}
