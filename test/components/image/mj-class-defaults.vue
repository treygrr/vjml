<script setup lang="ts">
import { Attributes, Body, Class, Column, Head, Image, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class
          border-radius="18px"
          name="gallery-image"
          padding="0px"
          width="250px"
        />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Class-backed image
          </Text>

          <Image
            alt="Class default image"
            mj-class="gallery-image"
            src="https://dummyimage.com/500x220/16353f/fffaf2.png&text=Class+Default"
          />

          <Spacer height="12px" />

          <Image
            alt="Explicit override image"
            border-radius="8px"
            mj-class="gallery-image"
            src="https://dummyimage.com/440x180/fbe8d7/173540.png&text=Override"
            width="210px"
          />
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>