<script setup lang='ts'>
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

const billingHeadRaw = `
      <meta name='x-billing-state' content='due-soon' />
      <style type='text/css'>.invoice-note div { color: #db7636; font-weight: 700; }</style>
    `
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
            <tr><td><strong>Plan</strong></td><td>Pro annual</td></tr>
            <tr><td><strong>Status</strong></td><td>Active</td></tr>
            <tr><td><strong>Renewal</strong></td><td>May 27</td></tr>
            <tr><td><strong>Seats</strong></td><td>12</td></tr>
          </Table>
          <Divider border-color='#d9c5ad' border-width='1px' padding='14px 0px' />
          <Text css-class='invoice-note'>Payment method expires in 7 days.</Text>
          <Spacer height='10px' />
          <Button
            align='left'
            background-color='#16353f'
            border-radius='999px'
            color='#fffaf2'
            href='https://example.com/billing'
            inner-padding='10px 16px'
          >
            Update billing
          </Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>