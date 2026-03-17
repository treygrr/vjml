<script setup lang="ts">
import { Body, Column, Mjml, Section, Text, Wrapper } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body width="340px" background-color="#eef3f8">
      <Wrapper background-color="#ffffff" gap="12px" padding="0px">
        <Section background-color="#fffdf8" padding="18px">
          <Column>
            <Text color="#173540" font-size="16px" font-weight="700" line-height="24px">
              First panel
            </Text>
          </Column>
        </Section>

        <Section background-color="#f8fafc" padding="18px">
          <Column>
            <Text color="#425d64" font-size="14px" line-height="22px">
              Gap should separate sibling sections inside the wrapper.
            </Text>
          </Column>
        </Section>
      </Wrapper>
    </Body>
  </Mjml>
</template>