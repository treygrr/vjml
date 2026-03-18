<script setup lang="ts">
import { Body, Column, Mjml, Raw, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Raw>
        <div style="max-width:340px;margin:0 auto 12px;padding:14px;border-radius:16px;background:#173540;color:#fffaf2;font-weight:700;line-height:22px;">
          <span style="color:#fffaf2">Injected raw HTML</span>
        </div>
      </Raw>

      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Text color="#425d64" font-size="14px" line-height="22px">
            Use Raw for markup you want to pass through without component wrapping.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>