import { toVjmlComponentName as formatVjmlComponentName } from '../../vjml'

import { useVjml } from './useVjml'

export {
  VJML_COMPONENT_NAME_EXAMPLES,
  toVjmlComponentBaseName,
  toVjmlComponentName,
} from '../../vjml'

export function useVjmlComponentName(tagName: string): string {
  return formatVjmlComponentName(tagName, useVjml().prefix)
}
