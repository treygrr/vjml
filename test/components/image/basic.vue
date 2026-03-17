<script setup lang="ts">
import { Body, Column, Image, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Image
            alt="Product preview"
            border-radius="18px"
            padding="0px"
            src="https://dummyimage.com/560x220/16353f/fffaf2.png&text=VJML+Image"
            width="280px"
          />

          <Spacer height="14px" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Use Image for product cards, banners, and editorial artwork.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>