import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VjmlPlugin from './index'

createApp(App)
	.use(VjmlPlugin, {
		prefix: 'VJ',
		render: {
			validation: 'warn',
		},
	})
	.mount('#app')
