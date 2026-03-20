<script setup lang="ts">
import VjmlRenderFrame from '../src/components/VjmlRenderFrame.vue';
import Email from './components/Email.vue'
</script>

<template>
	<main class="shell">
		<section class="panel catalog-section">
			<div class="section-copy">
				<p class="panel-label">Playground</p>
				<h1>Welcome to the VJML playground</h1>
				<p class="section-description">
					This page keeps the setup intentionally small. The preview below is rendered entirely through the plugin, and it mixes bare tags like <code>&lt;Mjml&gt;</code> with prefixed aliases like <code>&lt;VJText&gt;</code> and <code>&lt;VJButton&gt;</code>.
				</p>
			</div>

			<VjmlRenderFrame
				:title="'Email Preview'"
				:component="Email"
				height="600px"
			/>
		</section>
	</main>
</template>

