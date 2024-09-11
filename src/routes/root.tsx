import { PGlite } from "@electric-sql/pglite"
import { PGliteProvider } from "@electric-sql/pglite-react"
import { live } from "@electric-sql/pglite/live"
import { Outlet } from "react-router-dom"

const db = await PGlite.create({
  dataDir: `idb://todos`,
  extensions: { live },
})

export default function Root() {
  return (
    <PGliteProvider db={db}>
      <Outlet />
    </PGliteProvider>
  )
}
