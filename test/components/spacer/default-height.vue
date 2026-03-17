<script setup lang="ts">
import { Body, Column, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f4efe7" width="340px">
      <Section background-color="#fff8ef" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" line-height="22px">
            This spacer relies on the component default height.
          </Text>

          <Spacer />

          <Text color="#425d64" font-size="14px" line-height="22px">
            The default should match MJML without any explicit attributes.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>