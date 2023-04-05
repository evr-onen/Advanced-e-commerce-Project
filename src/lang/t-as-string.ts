import { StringMap, TOptionsBase, t } from "i18next"

export const tAsString = (key: string | string[], options?: (TOptionsBase & StringMap) | undefined): string => t(key, options) as string
