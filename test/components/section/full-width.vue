<script setup lang="ts">
import { Body, Column, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#eef3f8" width="340px">
      <Section
        background-color="#16353f"
        full-width="full-width"
        padding="24px 0px"
      >
        <Column>
          <Text color="#fff5e8" font-size="18px" font-weight="700" line-height="24px">
            Full width announcement
          </Text>

          <Spacer height="10px" />

          <Text color="#d9e3df" font-size="14px" line-height="22px">
            This section spans the body background while keeping the content constrained.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>