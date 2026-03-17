<script setup lang="ts">
import { Body, Column, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f4efe7" width="340px">
      <Section background-color="#fff8ef" padding="20px">
        <Column>
          <Text
            align="center"
            background-color="#fdf2e8"
            color="#173540"
            font-size="15px"
            letter-spacing="0.3px"
            line-height="24px"
            padding="12px 16px"
            text-transform="uppercase"
          >
            Read the <strong>weekly</strong>
            <a href="https://example.com/briefing">briefing</a><br>
            before Friday.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>