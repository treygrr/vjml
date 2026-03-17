<script setup lang="ts">
import { Attributes, Body, Button, Head, Hero, Mjml, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Hero
          background-color="#123640"
          inner-padding="16px 18px"
          mode="fluid-height"
          padding="0px"
          vertical-align="middle"
        />
        <Text color="#fff8ef" font-size="15px" line-height="22px" />
        <Button
          align="left"
          background-color="#df8a55"
          border-radius="999px"
          color="#fffdf8"
          inner-padding="8px 14px"
        />
      </Attributes>
    </Head>
    <Body background-color="#f5efe7" width="340px">
      <Hero
        background-height="220px"
        background-url="https://dummyimage.com/960x420/123640/fff8ef.png&text=Head+Defaults"
        background-width="340px"
      >
        <Text>
          Head-driven defaults
        </Text>
        <Spacer height="12px" />
        <Button href="https://example.com/library">
          Read guide
        </Button>
      </Hero>
    </Body>
  </Mjml>
</template>