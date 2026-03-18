<script setup lang="ts">
import { Body, Breakpoint, Column, Head, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Breakpoint width="280px" />
    </Head>
    <Body background-color="#f6eee5" width="360px">
      <Section background-color="#fff9f1" padding="20px">
        <Column width="30%">
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            30%
          </Text>
        </Column>
        <Column width="70%">
          <Text color="#425d64" font-size="14px" line-height="22px">
            A tighter breakpoint keeps the multi-column layout active on smaller screens.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>