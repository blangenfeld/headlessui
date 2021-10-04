import { onUnmounted } from 'vue'

export function useWindowEvent<TType extends keyof WindowEventMap>(
  type: TType,
  listener: (this: Window, ev: WindowEventMap[TType]) => any,
  options?: boolean | AddEventListenerOptions
) {
  const wrappedListener = function(this: Window, ev: WindowEventMap[TType]) {
    console.log(this, ev)
    return listener.bind(this)(ev)
  }
  window.addEventListener(type, wrappedListener, options)
  onUnmounted(() => window.removeEventListener(type, wrappedListener, options))
}
