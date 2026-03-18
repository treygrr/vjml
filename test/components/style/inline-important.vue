<script setup lang="ts">
import { Body, Column, Head, Mjml, Section, Spacer, Style, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Style inline="inline">
        .blue-text div {
          color:#2563eb !important;
          font-weight:700 !important;
        }
      </Style>
    </Head>
    <Body width="340px" background-color="#f6efe7">
      <Section background-color="#fff8ef" padding="22px">
        <Column>
          <Text css-class="blue-text" color="#173540" font-size="17px" line-height="24px">
            Inline style override
          </Text>
          <Spacer height="8px" />
          <Text color="#425d64" font-size="14px" line-height="22px">
            Important inline styles should override the component's authored inline declarations.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>