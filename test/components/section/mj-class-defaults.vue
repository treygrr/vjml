<script setup lang="ts">
import { Attributes, Body, Class, Column, Head, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class
          background-color="#fff8ef"
          name="card-row"
          padding="20px"
          text-align="left"
        />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section mj-class="card-row">
        <Column>
          <Text color="#173540" font-size="16px" font-weight="700" line-height="24px">
            Default section class
          </Text>

          <Spacer height="10px" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            The first section relies entirely on its class defaults.
          </Text>
        </Column>
      </Section>

      <Section background-color="#f1e2d1" mj-class="card-row" padding="12px 20px 20px">
        <Column>
          <Text color="#173540" font-size="16px" font-weight="700" line-height="24px">
            Override after class merge
          </Text>

          <Spacer height="10px" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Explicit section attributes should win after the class defaults are applied.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>