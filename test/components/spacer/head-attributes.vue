<script setup lang="ts">
import { Attributes, Body, Column, Head, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Spacer height="18px" padding="6px 0px" />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Shared spacer defaults
          </Text>

          <Spacer />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Head attributes should provide the base spacer height and padding.
          </Text>

          <Spacer height="30px" padding-top="14px" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Explicit spacer values should still override the inherited defaults.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>