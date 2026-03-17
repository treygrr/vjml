<script setup lang="ts">
import { Body, Button, Hero, Mjml, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f3efe7" width="340px">
      <Hero
        background-color="#25404a"
        background-height="320px"
        background-url="https://dummyimage.com/1200x600/25404a/fcf4eb.png&text=Fixed+Hero"
        background-width="340px"
        height="210px"
        inner-padding="24px"
        padding="0px"
        vertical-align="bottom"
      >
        <Text color="#fff8ee" font-size="22px" font-weight="700" line-height="28px">
          Limited seats
        </Text>
        <Spacer height="8px" />
        <Text color="#d9c9bb" font-size="13px" line-height="20px">
          Join the in-person workshop before registration closes on Friday.
        </Text>
        <Spacer height="12px" />
        <Button
          align="left"
          background-color="#f3c49a"
          border-radius="999px"
          color="#25404a"
          href="https://example.com/register"
          inner-padding="9px 15px"
        >
          Reserve seat
        </Button>
      </Hero>
    </Body>
  </Mjml>
</template>