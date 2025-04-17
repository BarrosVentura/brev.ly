import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { PluginOption, defineConfig } from 'vite'
import svgr, { VitePluginSvgrOptions } from 'vite-plugin-svgr'

const svgrPlugin = svgr as unknown as (
	props?: VitePluginSvgrOptions
) => PluginOption[]

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@types': path.resolve(__dirname, 'src/types'),
			'@services': path.resolve(__dirname, 'src/services')
		}
	},
	plugins: [react(), svgrPlugin(), tailwindcss()]
})
