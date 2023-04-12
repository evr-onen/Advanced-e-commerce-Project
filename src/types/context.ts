export type UserType = { name: string; surname: string; userRole: number; storeId: number }

export type SettingsType = {
  mode: string
  lang: string
  direction: string
}

export type VariantsType = {
  id: number
  variantName: string
  variantValues: { value: string }[]
}

export type CatsType = {
  id: number
  label: string
}

export type PropertyType = {
  id: number
  name: string
  values: PropertyTitleType[]
}

export type PropertyTitleType = {
  value: string
  values: PropertyTitleItemType[]
}

type PropertyTitleItemType = {
  value: string
}

export type CartProductType = {
  id: number
  product_id: number
  quantity: number
  variantValue?: {
    [key: string]: string
  }
}
