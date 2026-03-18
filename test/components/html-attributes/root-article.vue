<script setup lang="ts">
import {
  Body,
  Column,
  Head,
  HtmlAttribute,
  HtmlAttributes,
  Mjml,
  Section,
  Selector,
  Spacer,
  Text,
} from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <HtmlAttributes>
        <Selector path="div[role='article']">
          <HtmlAttribute name="data-campaign">spring-brief</HtmlAttribute>
        </Selector>
        <Selector path=".body-note div">
          <HtmlAttribute name="data-scope">inner-copy</HtmlAttribute>
        </Selector>
      </HtmlAttributes>
    </Head>
    <Body background-color="#f3ede5" width="340px">
      <Section background-color="#fff8f0" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Root article selector
          </Text>
          <Spacer height="8px" />
          <Text css-class="body-note" color="#425d64" font-size="14px" line-height="22px">
            Selectors can target the body wrapper as well as inner rendered descendants.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>