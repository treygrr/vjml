<script setup lang="ts">
import { Attributes, Body, Column, Divider, Head, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Divider border-color="#31566b" border-width="2px" padding="14px 0px" />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Shared divider defaults
          </Text>

          <Divider />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Head attributes should provide the divider border and spacing defaults.
          </Text>

          <Divider align="left" border-color="#db7636" padding-top="18px" width="42%" />
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>