<script setup lang="ts">
import { Body, Column, Font, Head, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Font
        href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap"
        name="Lora"
      />
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Text color="#173540" font-family="Lora, Georgia, serif" font-size="18px" font-weight="700" line-height="24px">
            External font declarations
          </Text>
          <Spacer height="10px" />
          <Text color="#425d64" font-family="Lora, Georgia, serif" font-size="14px" line-height="22px">
            Declare web fonts in Head, then reference them from content components such as Text and Button.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>