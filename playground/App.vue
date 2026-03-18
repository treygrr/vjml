<script setup lang="ts">
import { ref, onMounted } from 'vue'

const lineItems = ref([
	{ id: 1, label: 'Starter Plan', amount: 9.99 },
	{ id: 2, label: 'Pro Add-on', amount: 19.99 },
	{ id: 3, label: 'Extra Seats (×3)', amount: 14.97 },
	{ id: 4, label: 'Storage Upgrade', amount: 4.99 },
	{ id: 5, label: 'Priority Support', amount: 24.99 },
])

const total = ref<number | null>(null)

async function fetchTotal(): Promise<number> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(lineItems.value.reduce((sum, item) => sum + item.amount, 0))
		}, 600)
	})
}

onMounted(async () => {
	total.value = await fetchTotal()
})
</script>

<template>
	<main class="shell">
		<section class="panel catalog-section">
			<div class="section-copy">
				<p class="panel-label">Playground</p>
				<h1>Welcome to the VJML playground</h1>
				<p class="section-description">
					This page renders the preview entirely through the plugin using <code>VJ</code>-prefixed component aliases throughout.
				</p>
			</div>

			<div class="example-preview">
				<VJMjml lang="en">
					<VJBody width="340px" background-color="#f6efe7">
						<VJSection background-color="#fffaf2" padding="24px">
							<VJColumn>
								<VJText color="#db7636" font-size="12px" font-weight="700" letter-spacing="0.18em" text-transform="uppercase">
									Plugin check
								</VJText>

								<VJSpacer height="10px" />

								<VJText color="#173540" font-size="22px" font-weight="700" line-height="28px">
									Welcome to the preview workspace
								</VJText>

								<VJSpacer height="10px" />

								<VJText color="#425d64" font-size="14px" line-height="22px">
									The plugin is configured to register both unprefixed and VJ-prefixed component aliases, so the playground can verify both paths in one place.
								</VJText>

								<VJSpacer height="16px" />

								<VJButton
									align="left"
									background-color="#16353f"
									border-radius="999px"
									color="#fffaf2"
									href="https://example.com/docs"
									inner-padding="10px 16px"
								>
									Open documentation
								</VJButton>
							</VJColumn>
						</VJSection>

						<!-- Line items: iterated 5 times -->
						<VJSection
							v-for="item in lineItems"
							:key="item.id"
							background-color="#fffaf2"
							padding="0 24px"
							border-top="1px solid #e8ddd0"
						>
							<VJColumn>
								<VJText color="#425d64" font-size="13px" line-height="20px">
									{{ item.label }}
									<span style="float:right; color:#173540; font-weight:600">${{ item.amount.toFixed(2) }}</span>
								</VJText>
							</VJColumn>
						</VJSection>

						<!-- Total from mock API -->
						<VJSection background-color="#16353f" padding="16px 24px">
							<VJColumn>
								<VJText color="#fffaf2" font-size="14px" font-weight="700" line-height="20px">
									Total
									<span style="float:right">
										{{ total !== null ? `$${total.toFixed(2)}` : 'Loading…' }}
									</span>
								</VJText>
							</VJColumn>
						</VJSection>
					</VJBody>
				</VJMjml>
			</div>
		</section>
	</main>
</template>

