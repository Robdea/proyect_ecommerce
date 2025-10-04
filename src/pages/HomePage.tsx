import Category from "../features/category/view/Category";
import NewsPage from "../features/news/view/NewsPage";
import ProductPage from "../features/products/view/ProductPage";

export default function HomePage() {
  return (
    <>
        <NewsPage/>
        <ProductPage/>
        <Category/>
    </>
  )
}
