export { default, VjmlPlugin, registerVjmlComponents, resolveVjmlPluginConfig } from './plugin'
export {
	DEFAULT_VJML_FONTS,
	DEFAULT_VJML_PREFIX,
	DEFAULT_VJML_RENDER_OPTIONS,
	VJML_COMPONENT_NAME_EXAMPLES,
	mergeVjmlRuntimeConfig,
	resolveVjmlRenderOptions,
	resolveVjmlRuntimeConfig,
	toVjmlComponentBaseName,
	toVjmlComponentName,
} from './vjml'
export {
	VJML_COMPONENT_METADATA,
	VJML_COMPONENT_METADATA_BY_TAG_NAME,
	VJML_MANUAL_COMPONENT_TAG_NAMES,
	getVjmlComponentMetadata,
} from './metadata'
export { VJML_RUNTIME_COMPONENTS } from './runtime/manifest.generated'
export { useVjml } from './runtime/composables/useVjml'
export { useVjmlComponentName } from './runtime/composables/useVjmlComponentName'
export * from './runtime/components.generated'
export * from './runtime/component-types.generated'
export type {
	RenderVjmlToHtmlOptions,
	VjmlDebugDocumentState,
	VjmlDebugNode,
	VjmlDebugRenderResult,
	VjmlFontMap,
	VjmlRenderMode,
	VjmlRenderOptions,
	VjmlRenderResult,
	VjmlRuntimeConfig,
	VjmlRuntimeConfigInput,
	VjmlValidationIssue,
	VjmlValidationMode,
	VjmlValidationSeverity,
} from './vjml'
export type {
	VjmlComponentMetadata,
	VjmlComponentMetadataSource,
	VjmlComponentSerializationMetadata,
	VjmlComponentSlotKind,
} from './metadata'
export type { VjmlPluginOptions } from './plugin'