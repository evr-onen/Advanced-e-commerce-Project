import { PropertyType } from "@/types/context"

export type ProductType = {
  id?: number
  product_name: string
  price: string
  section_cat: { id: number; label: string }
  main_cat: { id: number; label: string }
  sub_cat: { id: number; label: string }
  selected_variants: {
    id: number
    variantName: string
    variantValues: { value: string }[]
  }[]
  rowVariantData: { [key: string]: string }[]
  description: string
  imageFiles: string[]
  selected_properties?: PropertyType
  productProperties?: string[][]
  isShouldUseVariant: boolean
  quantity?: number
}
