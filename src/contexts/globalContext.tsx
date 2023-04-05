// ** React / Next Core
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

// ** Types
import { UserType, SettingsType, VariantsType, CatsType, PropertyType, CartProductType } from "@/types/context"
import { ProductType } from "@/types/createProduct"

// ** Dummies
import { dummyProducts } from "@/dummyData/product"
import { productVariants as variants } from "@/dummyData/productVariants"
import { dummySection, dummyMain, dummySub } from "@/dummyData/cats"
import { properties } from "@/dummyData/properties"
import { dummyCartProduct } from "@/dummyData/cartProducts"

interface IGlobalContextProps {
  user: UserType
  setUser: (user: UserType) => void
  settings: SettingsType
  setSettings: (themeMode: SettingsType) => void
  variants: VariantsType[]
  setVariants: (variants: VariantsType[]) => void
  products: ProductType[]
  setProducts: (product: ProductType[]) => void
  sectionCategory: CatsType[]
  setSectionCategory: (cat: CatsType[]) => void
  mainCategory: CatsType[]
  setMainCategory: (cat: CatsType[]) => void
  subCategory: CatsType[]
  setSubCategory: (cat: CatsType[]) => void
  properties: PropertyType[]
  setProperties: (property: PropertyType[]) => void
  wishlist: number[] | []
  setWishlist: (productIds: number[]) => void
  cartProducts: CartProductType[]
  setCartProducts: (cartProduct: CartProductType[]) => void
  compareProducts: ProductType[]
  setCompareProducts: (product: ProductType[]) => void
}
export const GlobalContext = React.createContext<IGlobalContextProps>({
  user: { name: "", surname: "", userRole: 0, storeId: 0 },
  setUser: () => {},
  settings: { mode: "light", lang: "tr", direction: "ltr" },
  setSettings: () => {},
  variants: [],
  setVariants: () => {},
  products: [],
  setProducts: () => {},
  sectionCategory: [],
  setSectionCategory: () => {},
  mainCategory: [],
  setMainCategory: () => {},
  subCategory: [],
  setSubCategory: () => {},
  properties: [],
  setProperties: () => {},
  wishlist: [],
  setWishlist: () => {},
  cartProducts: [],
  setCartProducts: () => {},
  compareProducts: [],
  setCompareProducts: () => {},
})
let storage = ""
export const GlobalContextProvider = (props: any) => {
  // ** States
  const [currentUser, setCurrentUser] = useState<UserType>({ name: "", surname: "", userRole: 0, storeId: 0 })
  const [themeSettings, setthemeSettings] = useState({ mode: storage, lang: "tr", direction: "ltr" })
  const [allProducts, setAllProducts] = useState<ProductType[]>(dummyProducts)
  const [productVariants, setProductVariants] = useState(variants)
  const [sectionCategoryData, setSectionCategoryData] = useState<CatsType[]>(dummySection)
  const [mainCategoryData, setMainCategoryData] = useState<CatsType[]>(dummyMain)
  const [subCategoryData, setSubCategoryData] = useState<CatsType[]>(dummySub)
  const [propertiesData, setPropertiesData] = useState<PropertyType[]>(properties)
  const [wishlistData, setWishlistData] = useState<number[] | []>([1, 2, 3])
  const [cartProductsData, setCartProductsData] = useState<CartProductType[] | []>(dummyCartProduct)
  const [compareProductsData, setCompareProducts] = useState<ProductType[] | []>([])
  // ** Hooks
  const router = useRouter()

  // ** Get Acoount Details
  useEffect(() => {
    if (currentUser.name === "") {
      if (localStorage.getItem("user") !== null) {
        setCurrentUser(JSON.parse(localStorage.getItem("user")!))
      } else {
        router.push("/login")
      }
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        user: currentUser,
        settings: themeSettings,
        setUser: setCurrentUser,
        setSettings: setthemeSettings,
        variants: productVariants,
        setVariants: setProductVariants,
        products: allProducts,
        setProducts: setAllProducts,
        sectionCategory: sectionCategoryData,
        setSectionCategory: setSectionCategoryData,
        mainCategory: mainCategoryData,
        setMainCategory: setMainCategoryData,
        subCategory: subCategoryData,
        setSubCategory: setSubCategoryData,
        properties: propertiesData,
        setProperties: setPropertiesData,
        wishlist: wishlistData,
        setWishlist: setWishlistData,
        cartProducts: cartProductsData,
        setCartProducts: setCartProductsData,
        compareProducts: compareProductsData,
        setCompareProducts: setCompareProducts,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}
