<script setup lang="ts">
import { Body, Breakpoint, Column, Head, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Breakpoint width="640px" />
    </Head>
    <Body background-color="#f4ede4" width="600px">
      <Section background-color="#fff8ef" padding="24px">
        <Column width="33.333333%">
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Stage one
          </Text>
        </Column>
        <Column width="66.666667%">
          <Text color="#425d64" font-size="14px" line-height="22px">
            A wider breakpoint delays the stacked mobile layout until larger viewports.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>