<script setup lang="ts">
import { Body, Column, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body width="340px" background-color="#f7efe4">
      <Section background-color="#16353f" padding="24px">
        <Column>
          <Text color="#fff5e8" font-size="18px" font-weight="700" line-height="24px">
            Section as a layout row
          </Text>

          <Spacer height="10px" />

          <Text color="#d9e3df" font-size="14px" line-height="22px">
            Sections create horizontal bands in the email and usually contain one or more columns.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>