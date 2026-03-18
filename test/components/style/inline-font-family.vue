<script setup lang="ts">
import { Body, Column, Font, Head, Mjml, Section, Spacer, Style, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Font
        href="https://fonts.googleapis.com/css?family=Lora:400,700"
        name="Lora"
      />
      <Style inline="inline">
        .custom-font div {
          font-family:Lora, Georgia, serif !important;
        }
      </Style>
    </Head>
    <Body width="340px" background-color="#f3ede5">
      <Section background-color="#fff8f0" padding="22px">
        <Column>
          <Text css-class="custom-font" color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Inline font family
          </Text>
          <Spacer height="8px" />
          <Text color="#425d64" font-size="14px" line-height="22px">
            Font imports should still be emitted when the custom family only appears in inline stylesheet rules.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>