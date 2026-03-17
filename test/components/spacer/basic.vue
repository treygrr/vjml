<script setup lang="ts">
import { Body, Column, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Text color="#173540" font-size="16px" font-weight="700">
            Line one
          </Text>

          <Spacer height="18px" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Line two, separated by an email-safe vertical spacer.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>