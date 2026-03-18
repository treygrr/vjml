<script setup lang="ts">
import { Body, Breakpoint, Column, Group, Head, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Breakpoint width="360px" />
    </Head>
    <Body background-color="#f6efe7" width="360px">
      <Section background-color="#fff8f0" padding="20px">
        <Group>
          <Column width="50%">
            <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
              Morning
            </Text>
          </Column>
          <Column width="50%">
            <Text color="#425d64" font-size="14px" line-height="22px">
              Group children should respect the same responsive breakpoint tags as regular section columns.
            </Text>
          </Column>
        </Group>
      </Section>
    </Body>
  </Mjml>
</template>