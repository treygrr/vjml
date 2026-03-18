<script setup lang="ts">
import { Body, Column, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Hello from VJML
          </Text>

          <Spacer height="10px" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            A full email tree starts with Mjml and a single Body. Everything else composes underneath it.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>