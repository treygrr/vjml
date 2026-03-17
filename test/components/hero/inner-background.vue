<script setup lang="ts">
import { Body, Hero, Mjml, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#faf3ea" width="340px">
      <Hero
        background-color="#70462b"
        background-height="240px"
        background-position="left top"
        background-url="https://dummyimage.com/960x480/70462b/fff8f0.png&text=Inner+Panel"
        background-width="340px"
        border-radius="18px"
        inner-background-color="#fffaf2"
        inner-padding="18px 20px"
        mode="fluid-height"
        padding="14px"
        vertical-align="top"
      >
        <Text color="#70462b" font-size="20px" font-weight="700" line-height="26px">
          Wrapped summary
        </Text>
        <Spacer height="8px" />
        <Text color="#7d624b" font-size="13px" line-height="20px">
          Use an inner panel when the background image needs a readable text surface.
        </Text>
      </Hero>
    </Body>
  </Mjml>
</template>