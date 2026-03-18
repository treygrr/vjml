<script setup lang="ts">
import { Body, Breakpoint, Column, Head, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Breakpoint width="480px" />
    </Head>
    <Body background-color="#f5efe6" width="520px">
      <Section background-color="#fff9f2" padding="18px">
        <Column width="180px">
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Fixed rail
          </Text>
        </Column>
        <Column width="304px">
          <Text color="#425d64" font-size="14px" line-height="22px">
            Pixel-based column classes should still pick up the custom breakpoint in the emitted media query.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>