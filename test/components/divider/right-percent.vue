<script setup lang="ts">
import { Body, Column, Divider, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f4efe7" width="340px">
      <Section background-color="#fff8ef" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" line-height="24px">
            A right-aligned divider should respect percent widths after padding is removed.
          </Text>

          <Divider
            align="right"
            border-color="#173540"
            border-style="dashed"
            border-width="3px"
            padding="18px 32px 10px 12px"
            width="55%"
          />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Outlook should receive a pixel width equivalent for the percentage rule.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>