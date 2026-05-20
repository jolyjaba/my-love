/// <reference types="vite/client" />
/// <reference path="./src/types/tsparticles-vue3.d.ts" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
