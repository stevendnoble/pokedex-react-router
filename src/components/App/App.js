import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { Home } from "../Home/Home";
import { PokedexWithProvider } from "../Pokedex/Pokedex";
import { SearchWithProvider } from "../Search/Search";
import { Root } from "../Root/Root";
import styles from "./App.module.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
          exact: true,
        },
        {
          path: "/search",
          element: <SearchWithProvider />,
          exact: true,
        },
        {
          path: "/pokedex",
          element: <PokedexWithProvider />,
          exact: true,
        },
      ],
    },
  ],
  {
    basename: "/webdevfun/pokemon/pokedex-react-router",
  },
);

export function App() {
  return (
    <div className={styles.App}>
      <RouterProvider router={router} />
    </div>
  );
}
