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
        <Selector path=".summary div">
          <HtmlAttribute name="aria-label">Primary "summary"</HtmlAttribute>
          <HtmlAttribute name="data-state">ready</HtmlAttribute>
        </Selector>
      </HtmlAttributes>
    </Head>
    <Body background-color="#f6efe7" width="340px">
      <Section background-color="#fff8ef" padding="22px">
        <Column>
          <Text css-class="summary" color="#173540" font-size="17px" font-weight="700" line-height="24px">
            Multiple attributes
          </Text>
          <Spacer height="8px" />
          <Text color="#425d64" font-size="14px" line-height="22px">
            A single selector can attach multiple HTML attributes to the same rendered node.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>