<script setup lang="ts">
import { Body, Button, Column, Mjml, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Button
            align="left"
            background-color="#db7636"
            border-radius="999px"
            color="#fffaf2"
            font-size="15px"
            font-weight="700"
            href="https://example.com/activity"
            inner-padding="12px 18px"
            line-height="18px"
            padding="0px"
            width="240px"
          >
            Review account activity
          </Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>