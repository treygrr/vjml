<script lang="ts" setup>
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
  <Mjml lang="en">

    <Body width="340px" background-color="#f6efe7">
      <Section background-color="#fffaf2" padding="24px">
        <Column>
          <Text color="#db7636" font-size="12px" font-weight="700" letter-spacing="0.18em" text-transform="uppercase">
            Plugin check
          </Text>

          <Spacer height="10px" />

          <VJText color="#173540" font-size="22px" font-weight="700" line-height="28px">
            Welcome to the preview workspace
          </VJText>

          <Spacer height="10px" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            The plugin is configured to register both unprefixed and <code>VJ</code>-prefixed component aliases, so the
            playground can verify both paths in one place.
          </Text>

          <Spacer height="16px" />

          <VJButton align="left" background-color="#16353f" border-radius="999px" color="#fffaf2"
            href="https://example.com/docs" inner-padding="10px 16px">
            Open documentation
          </VJButton>
        </Column>
      </Section>

      <!-- Line items: iterated 5 times -->
      <Section v-for="item in lineItems" :key="item.id" background-color="#fffaf2" padding="0 24px"
        border-top="1px solid #e8ddd0">
        <Column>
          <Text color="#425d64" font-size="13px" line-height="20px">
            {{ item.label }}
            <span style="float:right; color:#173540; font-weight:600">${{ item.amount.toFixed(2) }}</span>
          </Text>
        </Column>
      </Section>

      <!-- Total from mock API -->
      <Section background-color="#16353f" padding="16px 24px">
        <Column>
          <Text color="#fffaf2" font-size="14px" font-weight="700" line-height="20px">
            Total
            <span style="float:right">
              {{ total !== null ? `$${total.toFixed(2)}` : 'Loading…' }}
            </span>
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>