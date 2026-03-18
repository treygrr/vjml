<script setup lang="ts">
import { Body, Column, Head, Mjml, Preview, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Preview>See this line in inbox previews.</Preview>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Preview text
          </Text>

          <Spacer height="10px" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Preview content is hidden from the visible email body.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>