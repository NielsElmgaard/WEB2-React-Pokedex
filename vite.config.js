import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  base: 'WEB2-React-Pokedex',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
