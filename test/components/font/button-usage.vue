<script setup lang="ts">
import {
  Attributes,
  Body,
  Button,
  Column,
  Font,
  Head,
  Mjml,
  Section,
} from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Font
        href="https://fonts.googleapis.com/css?family=Lora:400,700"
        name="Lora"
      />
      <Attributes>
        <Button
          background-color="#0f172a"
          color="#f8fafc"
          font-size="17px"
          font-weight="700"
          inner-padding="14px 24px"
          text-transform="uppercase"
        />
      </Attributes>
    </Head>
    <Body background-color="#eef2ff">
      <Section background-color="#ffffff" padding="24px">
        <Column>
          <Button
            font-family="Lora, Georgia, serif"
            href="https://example.com/reset"
          >
            Reset password
          </Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>