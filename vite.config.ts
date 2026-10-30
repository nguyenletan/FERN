import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// `--mode integrated` composes the four applications into the portal (see docs/start/INTEGRATED-APPS.md).
// Any other mode is the website build, which must not contain application workflows.
export default defineConfig(({ mode }) => {
  const integrated = mode === "integrated";
  return {
    plugins: [react(), tailwindcss()],
    resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
    define: { "import.meta.env.VITE_FERN_APPS": JSON.stringify(integrated ? "on" : "off") },
    build: integrated ? { outDir: "dist-integrated" } : undefined,
    server: { host: "127.0.0.1" },
    preview: { host: "127.0.0.1" },
  };
});
