<script setup lang="ts">
import { Attributes, Body, Column, Head, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Section background-color="#ffffff" padding="18px 20px" text-align="left" />
        <Column background-color="#efe7db" />
        <Text color="#173540" font-size="15px" line-height="22px" />
      </Attributes>
    </Head>
    <Body background-color="#f3efe8" width="340px">
      <Section>
        <Column>
          <Text font-weight="700">
            Shared section defaults
          </Text>

          <Spacer height="8px" />

          <Text>
            Attribute inheritance should apply the row background, padding, and left alignment.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>