<script setup lang="ts">
import { Body, Column, Head, Mjml, Section, Spacer, Style, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Style>
        .style-note div { color:#0c7a7f; font-weight:700; letter-spacing:0.04em; }
      </Style>
    </Head>
    <Body width="340px" background-color="#f7efe4">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Text css-class="style-note" color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Custom head styles
          </Text>
          <Spacer height="10px" />
          <Text color="#425d64" font-size="14px" line-height="22px">
            Use Style for renderer-collected CSS you want emitted into the final email document head.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>