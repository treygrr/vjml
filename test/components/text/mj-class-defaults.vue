<script setup lang="ts">
import { Attributes, Body, Class, Column, Head, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class
          color="#425d64"
          font-size="14px"
          line-height="22px"
          name="body-copy"
          padding="0px"
        />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text mj-class="body-copy">
            Class-backed copy should inherit the shared typography defaults.
          </Text>

          <Text
            color="#173540"
            font-weight="700"
            line-height="24px"
            mj-class="body-copy"
            padding-top="12px"
          >
            Explicit values should override the merged text class defaults.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>