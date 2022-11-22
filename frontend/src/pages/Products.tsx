import { useEffect } from "react"

export const Products = () => {
  useEffect(() => {
    fetch("https://dummyproducts-api.herokuapp.com/api/v1/products")
      .then((res) => res.json())
      .then((json) => console.log(json))
  }, [])

  return <h1>Products</h1>
}
