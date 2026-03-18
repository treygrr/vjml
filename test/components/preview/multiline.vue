<script setup lang="ts">
import { Body, Column, Head, Mjml, Preview, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Preview>
        First line for the inbox.
        Second line keeps the summary specific.
      </Preview>
    </Head>
    <Body background-color="#f6efe8" width="340px">
      <Section background-color="#fffbf6" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Multiline preview text
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>