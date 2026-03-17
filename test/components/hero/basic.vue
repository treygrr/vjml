<script setup lang="ts">
import { Body, Button, Hero, Mjml, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Hero
        background-color="#16353f"
        background-height="220px"
        background-url="https://dummyimage.com/960x420/16353f/fffaf2.png&text=Hero+Launch"
        background-width="340px"
        inner-padding="20px"
        mode="fluid-height"
        padding="0px"
        vertical-align="top"
      >
        <Text color="#fff5e8" font-size="24px" font-weight="700" line-height="30px">
          Launch week
        </Text>
        <Spacer height="10px" />
        <Text color="#e8d9ca" font-size="14px" line-height="22px">
          Hero blocks combine background treatment with real email content.
        </Text>
        <Spacer height="14px" />
        <Button
          align="left"
          background-color="#db7636"
          border-radius="999px"
          color="#fffaf2"
          href="https://example.com/dashboard"
          inner-padding="10px 16px"
        >
          Open dashboard
        </Button>
      </Hero>
    </Body>
  </Mjml>
</template>