import { inject, provide, reactive, type InjectionKey } from 'vue'

export interface VjmlSocialContextState {
  inheritedAttrs: Record<string, string>
}

export interface VjmlNavbarContextState {
  baseUrl: string | null
  hamburgerId: string
}

export interface VjmlAccordionContextState {
  inheritedAttrs: Record<string, string>
}

export interface VjmlAccordionElementContextState {
  inheritedAttrs: Record<string, string>
}

export interface VjmlCarouselContextState {
  carouselId: string
  containerWidth: string
  inheritedAttrs: Record<string, string>
  thumbnails: string
}

const EMPTY_SOCIAL_CONTEXT: VjmlSocialContextState = Object.freeze({
  inheritedAttrs: {},
})

const EMPTY_NAVBAR_CONTEXT: VjmlNavbarContextState = Object.freeze({
  baseUrl: null,
  hamburgerId: '',
})

const EMPTY_ACCORDION_CONTEXT: VjmlAccordionContextState = Object.freeze({
  inheritedAttrs: {},
})

const EMPTY_ACCORDION_ELEMENT_CONTEXT: VjmlAccordionElementContextState = Object.freeze({
  inheritedAttrs: {},
})

const EMPTY_CAROUSEL_CONTEXT: VjmlCarouselContextState = Object.freeze({
  carouselId: '',
  containerWidth: '',
  inheritedAttrs: {},
  thumbnails: 'visible',
})

const VJML_SOCIAL_CONTEXT_KEY = Symbol(
  'vue-mjml-social-context',
) as InjectionKey<VjmlSocialContextState>

const VJML_NAVBAR_CONTEXT_KEY = Symbol(
  'vue-mjml-navbar-context',
) as InjectionKey<VjmlNavbarContextState>

const VJML_ACCORDION_CONTEXT_KEY = Symbol(
  'vue-mjml-accordion-context',
) as InjectionKey<VjmlAccordionContextState>

const VJML_ACCORDION_ELEMENT_CONTEXT_KEY = Symbol(
  'vue-mjml-accordion-element-context',
) as InjectionKey<VjmlAccordionElementContextState>

const VJML_CAROUSEL_CONTEXT_KEY = Symbol(
  'vue-mjml-carousel-context',
) as InjectionKey<VjmlCarouselContextState>

export function createVjmlSocialContextState(): VjmlSocialContextState {
  return reactive({
    inheritedAttrs: {},
  }) as VjmlSocialContextState
}

export function provideVjmlSocialContext(state: VjmlSocialContextState) {
  provide(VJML_SOCIAL_CONTEXT_KEY, state)
}

export function useVjmlSocialContext(): VjmlSocialContextState {
  return inject(VJML_SOCIAL_CONTEXT_KEY, EMPTY_SOCIAL_CONTEXT)
}

export function createVjmlNavbarContextState(
  hamburgerId: string,
): VjmlNavbarContextState {
  return reactive({
    baseUrl: null,
    hamburgerId,
  }) as VjmlNavbarContextState
}

export function provideVjmlNavbarContext(state: VjmlNavbarContextState) {
  provide(VJML_NAVBAR_CONTEXT_KEY, state)
}

export function useVjmlNavbarContext(): VjmlNavbarContextState {
  return inject(VJML_NAVBAR_CONTEXT_KEY, EMPTY_NAVBAR_CONTEXT)
}

export function createVjmlAccordionContextState(): VjmlAccordionContextState {
  return reactive({
    inheritedAttrs: {},
  }) as VjmlAccordionContextState
}

export function provideVjmlAccordionContext(state: VjmlAccordionContextState) {
  provide(VJML_ACCORDION_CONTEXT_KEY, state)
}

export function useVjmlAccordionContext(): VjmlAccordionContextState {
  return inject(VJML_ACCORDION_CONTEXT_KEY, EMPTY_ACCORDION_CONTEXT)
}

export function createVjmlAccordionElementContextState(): VjmlAccordionElementContextState {
  return reactive({
    inheritedAttrs: {},
  }) as VjmlAccordionElementContextState
}

export function provideVjmlAccordionElementContext(
  state: VjmlAccordionElementContextState,
) {
  provide(VJML_ACCORDION_ELEMENT_CONTEXT_KEY, state)
}

export function useVjmlAccordionElementContext(): VjmlAccordionElementContextState {
  return inject(
    VJML_ACCORDION_ELEMENT_CONTEXT_KEY,
    EMPTY_ACCORDION_ELEMENT_CONTEXT,
  )
}

export function createVjmlCarouselContextState(
  carouselId: string,
): VjmlCarouselContextState {
  return reactive({
    carouselId,
    containerWidth: '',
    inheritedAttrs: {},
    thumbnails: 'visible',
  }) as VjmlCarouselContextState
}

export function provideVjmlCarouselContext(state: VjmlCarouselContextState) {
  provide(VJML_CAROUSEL_CONTEXT_KEY, state)
}

export function useVjmlCarouselContext(): VjmlCarouselContextState {
  return inject(VJML_CAROUSEL_CONTEXT_KEY, EMPTY_CAROUSEL_CONTEXT)
}

export function mergeVjmlInheritedAttributes(
  attrs: Readonly<Record<string, string>>,
  explicitAttrs: Readonly<Record<string, string>>,
  inheritedAttrs: Readonly<Record<string, string>>,
): Record<string, string> {
  const mergedAttrs = { ...attrs }

  for (const [attributeName, value] of Object.entries(inheritedAttrs)) {
    if (value === undefined || explicitAttrs[attributeName] !== undefined) {
      continue
    }

    mergedAttrs[attributeName] = value
  }

  return mergedAttrs
}

export function createVjmlInteractiveId(prefix: string): string {
  return `${prefix}-${Math.random().toString(16).slice(2, 10)}`
}
