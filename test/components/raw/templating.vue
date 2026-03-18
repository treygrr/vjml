<script setup lang="ts">
import { Body, Column, Mjml, Raw, Section, Text } from 'vjml'

const templatingOpen = `
      <!-- htmlmin:ignore -->
      {% if customer.score < 5 %}
      <!-- htmlmin:ignore -->
    `

const templatingClose = `
      {% endif %}
    `
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe5" width="340px">
      <Raw :html="templatingOpen" />

      <Section background-color="#fff8ef" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Templating wrapper
          </Text>
        </Column>
      </Section>

      <Raw :html="templatingClose" />
    </Body>
  </Mjml>
</template>