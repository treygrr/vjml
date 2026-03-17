<script setup lang="ts">
import { Attributes, Body, Button, Class, Head, Hero, Mjml, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class
          background-color="#2f4537"
          border-radius="18px"
          height="200px"
          inner-padding="18px 20px"
          name="hero-shell"
          padding="0px"
          vertical-align="bottom"
        />
        <Class color="#f8f3eb" font-size="15px" line-height="22px" name="hero-copy" />
        <Class color="#fffdf9" font-size="22px" font-weight="700" line-height="28px" name="hero-title" />
        <Class
          align="left"
          background-color="#f0d1aa"
          border-radius="999px"
          color="#2f4537"
          inner-padding="9px 15px"
          name="hero-cta"
        />
      </Attributes>
    </Head>
    <Body background-color="#f3eee6" width="340px">
      <Hero
        background-height="260px"
        background-url="https://dummyimage.com/1040x520/2f4537/fffaf2.png&text=Class+Hero"
        background-width="340px"
        mj-class="hero-shell"
      >
        <Text mj-class="hero-title">
          Community notes
        </Text>
        <Spacer height="10px" />
        <Text mj-class="hero-copy">
          Monthly release notes and office hours in a single hero block.
        </Text>
        <Spacer height="12px" />
        <Button href="https://example.com/notes" mj-class="hero-cta">
          Open notes
        </Button>
      </Hero>
    </Body>
  </Mjml>
</template>