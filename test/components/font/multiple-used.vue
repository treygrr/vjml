<script setup lang="ts">
import { Body, Column, Font, Head, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Font
        href="https://fonts.googleapis.com/css?family=Lora:400,700"
        name="Lora"
      />
      <Font
        href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700"
        name="Libre Baskerville"
      />
    </Head>
    <Body background-color="#f4ece3" width="360px">
      <Section background-color="#fff9f1" padding="22px">
        <Column>
          <Text color="#173540" font-family="Lora, Georgia, serif" font-size="18px" font-weight="700" line-height="24px">
            Summary set in Lora
          </Text>
          <Spacer height="10px" />
          <Text color="#425d64" font-family="Libre Baskerville, Georgia, serif" font-size="14px" line-height="22px">
            Supporting copy uses a second declared family, so both imports should be emitted.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>