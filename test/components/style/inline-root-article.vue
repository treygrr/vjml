<script setup lang="ts">
import { Body, Column, Head, Mjml, Section, Spacer, Style, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Style inline="inline">
        div[role='article'] {
          border:2px dashed #d1b18d !important;
        }
      </Style>
    </Head>
    <Body width="340px" background-color="#f4ede4">
      <Section background-color="#fff9f1" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Root article inline selector
          </Text>
          <Spacer height="8px" />
          <Text color="#425d64" font-size="14px" line-height="22px">
            Inline styles should be applied after the document shell exists so global wrappers can be targeted.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>