<script setup lang="ts">
import { Body, Column, Head, Mjml, Raw, Section, Text } from 'vjml'

const headRaw = `
      <meta name="x-raw-token" content="head-fragment" />
      <style type="text/css">.raw-head-flag { letter-spacing: 0.4px; }</style>
    `
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Raw :html="headRaw" />
    </Head>
    <Body background-color="#f5efe7" width="340px">
      <Section background-color="#fff9f3" padding="22px">
        <Column>
          <Text css-class="raw-head-flag" color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Head raw fragment
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>