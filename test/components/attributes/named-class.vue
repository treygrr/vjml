<script setup lang="ts">
import { Attributes, Body, Class, Column, Head, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class
          name="eyebrow"
          color="#db7636"
          font-size="12px"
          font-weight="700"
          letter-spacing="0.16em"
          text-transform="uppercase"
        />
      </Attributes>
    </Head>
    <Body width="340px" background-color="#f7efe4">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Named class presets
          </Text>
          <Spacer height="8px" />
          <Text color="#425d64" font-size="14px" line-height="22px">
            Define a reusable class in Attributes, then reference it with mj-class on matching components.
          </Text>
          <Spacer height="8px" />
          <Text mj-class="eyebrow">
            Priority update
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>