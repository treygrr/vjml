<script setup lang="ts">
import { Body, Column, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Decorated spacer
          </Text>

          <Spacer
            border-top="1px solid #db7636"
            container-background-color="#fff2e7"
            height="24px"
            padding="12px 0px"
          />

          <Text color="#425d64" font-size="14px" line-height="22px">
            Borders, padding, and container background should wrap the spacer cleanly.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>