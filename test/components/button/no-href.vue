<script setup lang="ts">
import { Body, Button, Column, Mjml, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body>
      <Section background-color="#f8fafc" padding="24px">
        <Column>
          <Button
            background-color="#14532d"
            border-radius="8px"
            color="#ecfdf5"
            font-weight="700"
            inner-padding="10px 18px"
          >
            Saved without link
          </Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>