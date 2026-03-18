<script setup lang="ts">
import { Body, Breakpoint, Column, Head, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Breakpoint width="320px" />
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column width="50%">
          <Text color="#173540" font-size="16px" font-weight="700" line-height="22px">
            Left summary
          </Text>
        </Column>
        <Column width="50%">
          <Text color="#425d64" font-size="14px" line-height="22px">
            The responsive media query should switch at 320px.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>