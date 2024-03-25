export interface ProductData_Interface {
 productName: string
 shortDescription: string
 mainDescription: string
 productImage1: string
 productImage2: string
 quantity: number,
 amount: number
}

export interface UpdateProductData_Interface {
  productId: number|null
  productName: string
  shortDescription: string
  mainDescription: string
  productImage1: string
  productImage2: string
  quantity: number,
  amount: number
}

export interface ProductDelete_Interface {
  productId: number
  reasons_For_Delete: string
}
