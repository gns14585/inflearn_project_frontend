import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import TodoRouter from "./todoRouter";
import ProductsRouter from "./productsRouter";

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutPage"));
const TodoIndex = lazy(() => import("../pages/todo/indexPage"));
const ProductsIndex = lazy(() => import("../pages/products/IndexPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "about",
    element: (
      <Suspense fallback={Loading}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "todo",
    element: (
      <Suspense fallback={Loading}>
        <TodoIndex />
      </Suspense>
    ),
    children: TodoRouter(),
  },
  {
    path: "products",
    element: (
      <Suspense fallback={Loading}>
        <ProductsIndex />
      </Suspense>
    ),
    children: ProductsRouter(),
  },
]);
export default root;
