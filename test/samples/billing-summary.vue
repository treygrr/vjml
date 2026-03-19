<script setup lang='ts'>
import {
  computed,
  reactive,
} from 'vue'

import {
  Body,
  Button,
  Column,
  Divider,
  Head,
  Mjml,
  Raw,
  Section,
  Spacer,
  Table,
  Text,
  Title,
} from 'vjml'

type BillingSummaryRecord = {
  plan: string
  renewalDate: string
  seatCount: number
  status: string
  paymentMethodExpiresInDays: number
}

// In a real app this could be hydrated from an API response before rendering.
function fetchBillingSummary(): BillingSummaryRecord {
  return {
    plan: 'Pro annual',
    renewalDate: 'May 27',
    seatCount: 12,
    status: 'Active',
    paymentMethodExpiresInDays: 7,
  }
}

const billingSummary = reactive(fetchBillingSummary())

const billingHeadRaw = computed(() => {
  const billingState = billingSummary.paymentMethodExpiresInDays <= 7 ? 'due-soon' : 'current'

  return `
      <meta name='x-billing-state' content='${billingState}' />
      <style type='text/css'>.invoice-note div { color: #db7636; font-weight: 700; }</style>
    `
})

const billingRows = computed(() => {
  return [
    { label: 'Plan', value: billingSummary.plan },
    { label: 'Status', value: billingSummary.status },
    { label: 'Renewal', value: billingSummary.renewalDate },
    { label: 'Seats', value: String(billingSummary.seatCount) },
  ]
})

const showPaymentWarning = computed(() => {
  return billingSummary.paymentMethodExpiresInDays <= 7
})

const billingNotice = computed(() => {
  return `Payment method expires in ${billingSummary.paymentMethodExpiresInDays} days.`
})

const ctaLabel = computed(() => {
  return showPaymentWarning.value ? 'Update billing' : 'Review billing'
})
</script>

<template>
  <Mjml lang='en'>
    <Head>
      <Title>Billing summary</Title>
      <Raw :html='billingHeadRaw' />
    </Head>

    <Body background-color='#f7efe4' width='340px'>
      <Section background-color='#fffdf8' padding='22px'>
        <Column>
          <Text color='#173540' font-size='20px' font-weight='700' line-height='26px'>
            Billing summary
          </Text>
          <Spacer height='10px' />
          <Table cellpadding='6' cellspacing='0' color='#173540' font-size='14px' padding='0px' role='presentation' width='100%'>
            <tr v-for='row in billingRows' :key='row.label'>
              <td><strong>{{ row.label }}</strong></td>
              <td>{{ row.value }}</td>
            </tr>
          </Table>

          <template v-if='showPaymentWarning'>
            <Divider border-color='#d9c5ad' border-width='1px' padding='14px 0px' />
            <Text css-class='invoice-note'>{{ billingNotice }}</Text>
            <Spacer height='10px' />
          </template>

          <Button
            align='left'
            background-color='#16353f'
            border-radius='999px'
            color='#fffaf2'
            href='https://example.com/billing'
            inner-padding='10px 16px'
          >
            {{ ctaLabel }}
          </Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>