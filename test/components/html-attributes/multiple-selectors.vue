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
        <Selector path=".headline div">
          <HtmlAttribute name="data-role">headline</HtmlAttribute>
        </Selector>
        <Selector path=".detail div">
          <HtmlAttribute name="data-role">detail</HtmlAttribute>
          <HtmlAttribute name="data-track">secondary-copy</HtmlAttribute>
        </Selector>
      </HtmlAttributes>
    </Head>
    <Body background-color="#f4ede4" width="340px">
      <Section background-color="#fff9f1" padding="22px">
        <Column>
          <Text css-class="headline" color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Multiple selector paths
          </Text>
          <Spacer height="8px" />
          <Text css-class="detail" color="#425d64" font-size="14px" line-height="22px">
            Different selectors can stamp different attribute payloads onto different rendered nodes in the same message.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>