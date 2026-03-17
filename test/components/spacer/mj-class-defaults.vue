<script setup lang="ts">
import { Attributes, Body, Class, Column, Head, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class
          container-background-color="#fff2e7"
          height="22px"
          name="copy-gap"
          padding="8px 0px"
        />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Class-backed spacer
          </Text>

          <Spacer mj-class="copy-gap" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            The first spacer uses only the shared class defaults.
          </Text>

          <Spacer
            container-background-color="#fbe8d7"
            height="32px"
            mj-class="copy-gap"
            padding="12px 0px 4px"
          />
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>