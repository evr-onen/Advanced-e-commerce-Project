export const dummyProducts = [
  {
    id: 1,
    product_name: "Blender 01",
    price: "1200",
    section_cat: { id: 1, label: "mutfak" },
    main_cat: { id: 1, label: "robotlar" },
    sub_cat: { id: 1, label: "blender" },
    selected_variants: [{ id: 1, variantName: "color", variantValues: [{ value: "white" }, { value: "gray" }, { value: "red" }, { value: "blue" }] }],
    rowVariantData: [
      { quantity: "4", color: "gray" },
      { quantity: "34", color: "white" },
      { quantity: "15", color: "blue" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imageFiles: ["product-1.jpg", "product-2.jpg"],
    selected_properties: {
      id: 1,
      name: "Laptop",
      values: [
        { value: "Teknik Ozellikler", values: [{ value: "pil hucre sayisi" }, { value: "guvenlik" }, { value: "pil kimyasi" }] },
        { value: "Ram ozellikleri", values: [{ value: "ram tipi" }, { value: "Ram (Sistem Belleği)" }] },
        { value: "HDD Özellikleri", values: [{ value: "Disk Kapasitesi" }, { value: "Disk Türü" }] },
      ],
    },
    productProperties: [
      ["Blender 01 1", "Blender 01 2", " Blender 013"],
      [" Blender 01 11", "Blender 01 22"],
      ["Blender 01 111", "Blender 01 222"],
    ],
    isShouldUseVariant: true,
  },
  {
    id: 2,
    product_name: "Blender 02",
    price: "150",
    section_cat: { id: 1, label: "mutfak" },
    main_cat: { id: 1, label: "robotlar" },
    sub_cat: { id: 1, label: "blender" },
    selected_variants: [
      {
        id: 1,
        variantName: "color",
        variantValues: [{ value: "white" }, { value: "gray" }, { value: "red" }, { value: "blue" }, { value: "black" }],
      },
    ],
    rowVariantData: [
      { quantity: "12", color: "black" },
      { quantity: "5", color: "white" },
      { quantity: "5", color: "gray" },
    ],
    imageFiles: ["product-1.jpg", "product-2.jpg"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    selected_properties: {
      id: 1,
      name: "Laptop",
      values: [
        { value: "Teknik Ozellikler", values: [{ value: "pil hucre sayisi" }, { value: "guvenlik" }, { value: "pil kimyasi" }] },
        { value: "Ram ozellikleri", values: [{ value: "ram tipi" }, { value: "Ram (Sistem Belleği)" }] },
        { value: "HDD Özellikleri", values: [{ value: "Disk Kapasitesi" }, { value: "Disk Türü" }] },
      ],
    },
    productProperties: [
      ["Blender 02 1", " Blender 02 2", "Blender 02 3"],
      [" Blender 02 11", "Blender 02 22"],
      [" Blender 02 111", "Blender 02 222"],
    ],
    isShouldUseVariant: true,
  },
  {
    id: 3,
    product_name: "Mouse 01",
    price: "150",
    section_cat: { id: 2, label: "bilgisayar" },
    main_cat: { id: 2, label: "bilsenler" },
    sub_cat: { id: 2, label: "mouse" },
    selected_variants: [
      {
        id: 1,
        variantName: "color",
        variantValues: [{ value: "white" }, { value: "gray" }, { value: "red" }, { value: "blue" }, { value: "black" }],
      },
    ],
    imageFiles: ["product-1.jpg", "product-2.jpg"],
    rowVariantData: [
      { quantity: "45", color: "white", size: "small" },
      { quantity: "12", color: "black", size: "small" },
      { quantity: "5", color: "gray", size: "small" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    selected_properties: {
      id: 1,
      name: "Laptop",
      values: [
        { value: "Teknik Ozellikler", values: [{ value: "pil hucre sayisi" }, { value: "guvenlik" }, { value: "pil kimyasi" }] },
        { value: "Ram ozellikleri", values: [{ value: "ram tipi" }, { value: "Ram (Sistem Belleği)" }] },
        { value: "HDD Özellikleri", values: [{ value: "Disk Kapasitesi" }, { value: "Disk Türü" }] },
      ],
    },
    productProperties: [
      ["Mouse 01 1", "Mouse 01 2", "Mouse 01 3"],
      ["Mouse 01 11", "Mouse 01 22"],
      ["Mouse 01 111", "Mouse 01 222"],
    ],
    isShouldUseVariant: true,
  },
  {
    id: 4,
    product_name: "Mouse 03",
    price: "170",
    section_cat: { id: 2, label: "bilgisayar" },
    main_cat: { id: 2, label: "bilsenler" },
    sub_cat: { id: 2, label: "mouse" },
    selected_variants: [
      {
        id: 1,
        variantName: "color",
        variantValues: [{ value: "white" }, { value: "gray" }, { value: "red" }, { value: "blue" }, { value: "black" }],
      },
      {
        id: 2,
        variantName: "size",
        variantValues: [{ value: "small" }, { value: "medium" }, { value: "large" }, { value: "xlarge" }],
      },
    ],
    rowVariantData: [
      { quantity: "5", color: "white", size: "large" },
      { quantity: "12", color: "black", size: "small" },
      { quantity: "5", color: "gray", size: "small" },
    ],
    imageFiles: ["product-7.jpg"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    selected_properties: {
      id: 1,
      name: "Laptop",
      values: [
        { value: "Teknik Ozellikler", values: [{ value: "pil hucre sayisi" }, { value: "guvenlik" }, { value: "pil kimyasi" }] },
        { value: "Ram ozellikleri", values: [{ value: "ram tipi" }, { value: "Ram (Sistem Belleği)" }] },
        { value: "HDD Özellikleri", values: [{ value: "Disk Kapasitesi" }, { value: "Disk Türü" }] },
        { value: "HDD Özellikleri2", values: [{ value: "Disk Kapasitesi" }, { value: "Disk Türü" }] },
        { value: "HDD Özellikleri3", values: [{ value: "Disk Kapasitesi" }, { value: "Disk Türü" }] },
        { value: "Teknik Ozellikler2", values: [{ value: "pil hucre sayisi" }, { value: "guvenlik" }, { value: "pil kimyasi" }] },
        { value: "Ram ozellikleri4", values: [{ value: "ram tipi" }, { value: "Ram (Sistem Belleği)" }] },
        { value: "HDD Özellikleri5", values: [{ value: "Disk Kapasitesi" }, { value: "Disk Türü" }] },
        { value: "HDD Özellikleri3", values: [{ value: "Disk Kapasitesi" }, { value: "Disk Türü" }] },
      ],
    },
    productProperties: [
      ["Mouse 03 1", "Mouse 03 2", "Mouse 03 3"],
      ["Mouse 03 11", "Mouse 03 22"],
      ["Mouse 03 111", "Mouse 03 222"],
      ["Mouse 03 111", "Mouse 03 222"],
      ["Mouse 03 111", "Mouse 03 222"],
      ["Mouse 03 1", "Mouse 03 2", "Mouse 03 3"],
      ["Mouse 03 111", "Mouse 03 222"],
      ["Mouse 03 111", "Mouse 03 222"],
      ["Mouse 03 1", "Mouse 03 2", "Mouse 03 3"],
    ],
    isShouldUseVariant: true,
  },
  {
    id: 5,
    product_name: "Mouse 04",
    price: "170",
    section_cat: { id: 2, label: "bilgisayar" },
    main_cat: { id: 2, label: "bilsenler" },
    sub_cat: { id: 2, label: "mouse" },
    selected_variants: [
      {
        id: 1,
        variantName: "color",
        variantValues: [{ value: "white" }, { value: "gray" }, { value: "red" }, { value: "blue" }, { value: "black" }],
      },

      {
        id: 2,
        variantName: "size",
        variantValues: [{ value: "small" }, { value: "medium" }, { value: "large" }, { value: "xlarge" }],
      },
    ],
    imageFiles: ["product-11.jpg", "product-20.jpg", "product-23.jpg", "product-55.jpg"],
    rowVariantData: [
      { quantity: "7", color: "white", size: "large" },
      { quantity: "5", color: "blue", size: "small" },
      { quantity: "12", color: "black", size: "small" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    selected_properties: {
      id: 1,
      name: "Laptop",
      values: [
        { value: "Teknik Ozellikler", values: [{ value: "pil hucre sayisi" }, { value: "guvenlik" }, { value: "pil kimyasi" }] },
        { value: "Ram ozellikleri", values: [{ value: "ram tipi" }, { value: "Ram (Sistem Belleği)" }] },
        { value: "HDD Özellikleri", values: [{ value: "Disk Kapasitesi" }, { value: "Disk Türü" }] },
      ],
    },
    productProperties: [
      ["Mouse 04 1", "Mouse 04 2", "Mouse 04 3"],
      ["Mouse 04 11", "Mouse 04 22"],
      ["Mouse 04 111", "Mouse 04 222"],
    ],
    isShouldUseVariant: true,
  },

  {
    id: 7,
    product_name: "Scott Logan",
    price: "409",
    section_cat: { id: 1, label: "mutfak" },
    main_cat: { id: 1, label: "robotlar" },
    sub_cat: { id: 1, label: "blender" },
    selected_variants: [
      {
        id: 1,
        variantName: "color",
        variantValues: [{ value: "white" }, { value: "gray" }, { value: "red" }, { value: "blue" }, { value: "black" }],
      },
      {
        id: 2,
        variantName: "size",
        variantValues: [{ value: "small" }, { value: "medium" }, { value: "large" }, { value: "xlarge" }],
      },
    ],
    description: "Mollitia aut velit n",
    imageFiles: ["product-7.jpg", "product-11.jpg"],
    isShouldUseVariant: true,
    productProperties: [
      ["Scott Logan 1", "Scott Logan 2", "Scott Logan 3"],
      ["Scott Logan 11", "Scott Logan 22", "Scott Logan 33"],
      ["Scott Logan 111", "Scott Logan 222", "Scott Logan 333"],
    ],
    quantity: 48,

    selected_properties: {
      id: 1,
      name: "Laptop",
      values: [
        { value: "Teknik Ozellikler", values: [{ value: "pil hucre sayisi" }, { value: "guvenlik" }, { value: "pil kimyasi" }] },
        { value: "Ram ozellikleri", values: [{ value: "pil hucre sayisi" }, { value: "guvenlik" }, { value: "pil kimyasi" }] },
        { value: "HDD Özellikleri", values: [{ value: "pil hucre sayisi" }, { value: "guvenlik" }, { value: "pil kimyasi" }] },
      ],
    },
  },
]
