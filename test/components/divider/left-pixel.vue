<script setup lang="ts">
import { Body, Column, Divider, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Fixed-width divider
          </Text>

          <Divider
            align="left"
            border-color="#31566b"
            border-width="1px"
            container-background-color="#fbe8d7"
            padding="14px 24px 18px 0px"
            width="120px"
          />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Pixel widths should flow through unchanged and keep the left alignment margin.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>