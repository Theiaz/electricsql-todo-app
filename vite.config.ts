import alegreyaSans from "@capsizecss/metrics/alegreyaSans"
import arial from "@capsizecss/metrics/arial"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { capsizeRadixPlugin } from "vite-plugin-capsize-radix"

export default defineConfig({
  plugins: [
    react(),
    capsizeRadixPlugin({
      // Import this file into your app after you import Radix's CSS.
      outputPath: `./public/typography.css`,
      // Pass in Capsize font metric objects.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultFontStack: [alegreyaSans as any, arial as any],
    }),
  ],
  optimizeDeps: {
    exclude: [`@electric-sql/pglite`],
  },
})
