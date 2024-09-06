import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./error-page"
import "@radix-ui/themes/styles.css"
import "../public/typography.css"
import { Theme } from "@radix-ui/themes"
import "@fontsource/alegreya-sans/latin.css"

import Index from "./routes/index"

// Start example routes
import Root from "./routes/root"
// End example routes

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
])

async function render() {
  ReactDOM.createRoot(document.getElementById(`root`)!).render(
    <React.StrictMode>
      <Theme accentColor="indigo">
        <RouterProvider router={router} />
      </Theme>
    </React.StrictMode>
  )
}

render()
