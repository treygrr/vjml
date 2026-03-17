<script setup lang="ts">
import { Attributes, Body, Column, Head, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Text color="#425d64" font-size="14px" line-height="22px" padding="0px" />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text>
            Head attributes should define the base text styling.
          </Text>

          <Text color="#173540" font-weight="700" padding-top="12px">
            Explicit text attributes should still win after inheritance.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>