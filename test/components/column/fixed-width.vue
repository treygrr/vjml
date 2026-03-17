<script setup lang="ts">
import { Body, Button, Column, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body width="340px" background-color="#eef3f8">
      <Section background-color="#ffffff" padding="20px">
        <Column width="200px" vertical-align="middle">
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Primary summary
          </Text>
        </Column>

        <Column width="100px" vertical-align="middle">
          <Button
            align="right"
            background-color="#16353f"
            color="#fffaf2"
            href="https://example.com/open"
            inner-padding="10px 14px"
            padding="0px"
          >
            Open
          </Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>