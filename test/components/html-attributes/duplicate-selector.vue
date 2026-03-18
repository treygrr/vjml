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
        <Selector path=".merge-target div">
          <HtmlAttribute name="data-first">alpha</HtmlAttribute>
        </Selector>
        <Selector path=".merge-target div">
          <HtmlAttribute name="data-second">beta</HtmlAttribute>
        </Selector>
      </HtmlAttributes>
    </Head>
    <Body background-color="#f5eee6" width="340px">
      <Section background-color="#fffaf5" padding="22px">
        <Column>
          <Text css-class="merge-target" color="#173540" font-size="17px" font-weight="700" line-height="24px">
            Duplicate selector merge
          </Text>
          <Spacer height="8px" />
          <Text color="#425d64" font-size="14px" line-height="22px">
            Later selector nodes targeting the same path should merge additional attributes instead of overwriting the whole bucket.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>