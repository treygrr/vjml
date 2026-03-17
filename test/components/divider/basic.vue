<script setup lang="ts">
import { Body, Column, Divider, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Text color="#173540" font-size="16px" font-weight="700">
            Above the divider
          </Text>

          <Divider border-color="#db7636" border-width="2px" padding="16px 0px" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Below the divider
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>