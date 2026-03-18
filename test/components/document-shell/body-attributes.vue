<script setup lang="ts">
import { Body, Column, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml dir="rtl" lang="ar">
    <Body background-color="#ede3d7" css-class="body-shell" width="340px">
      <Section background-color="#16353f" padding="24px">
        <Column>
          <Text color="#fff5e8" font-size="18px" font-weight="700" line-height="24px">
            Body controls the canvas
          </Text>

          <Spacer height="10px" />

          <Text color="#d9e3df" font-size="14px" line-height="22px">
            Set the global width and background at the email body level, then compose sections inside it.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>