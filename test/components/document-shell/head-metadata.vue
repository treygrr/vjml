<script setup lang="ts">
import { Body, Column, Head, Mjml, Preview, Section, Spacer, Text, Title } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Title>Weekly summary</Title>
      <Preview>Open for this week's highlights.</Preview>
    </Head>

    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Head-driven metadata
          </Text>

          <Spacer height="10px" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Use Head to collect preview text, title, fonts, styles, and attribute declarations before client render.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>