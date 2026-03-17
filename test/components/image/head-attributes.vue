<script setup lang="ts">
import { Attributes, Body, Column, Head, Image, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Image border-radius="16px" padding="0px" width="260px" />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Image
            alt="Inherited defaults"
            src="https://dummyimage.com/520x220/fbe8d7/173540.png&text=Defaults"
          />

          <Spacer height="12px" />

          <Image
            alt="Override after inherit"
            border-radius="6px"
            src="https://dummyimage.com/440x180/fff2e7/173540.png&text=Override"
            width="220px"
          />
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>