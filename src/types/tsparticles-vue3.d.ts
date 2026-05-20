declare module "@tsparticles/vue3" {
  import type { App, Component } from "vue";
  import type { Engine } from "@tsparticles/engine";

  export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

  export interface IParticlesProviderOptions {
    init?: ParticlesPluginRegistrar;
  }

  const Particles: (app: App, options?: IParticlesProviderOptions) => void;
  export default Particles;
  export const VueParticles: Component;
}

declare module "@vue/runtime-core" {
  import type { Component } from "vue";
  import type { VueParticles as VueParticlesComponent } from "@tsparticles/vue3";

  export interface GlobalComponents {
    "vue-particles": VueParticlesComponent;
  }
}

export {};
