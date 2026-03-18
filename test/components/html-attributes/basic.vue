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
        <Selector path=".attr-target div">
          <HtmlAttribute name="data-id">42</HtmlAttribute>
        </Selector>
      </HtmlAttributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Text css-class="attr-target" color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Selector-driven attributes
          </Text>
          <Spacer height="8px" />
          <Text color="#425d64" font-size="14px" line-height="22px">
            Basic selectors can apply custom data attributes to rendered descendants.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>