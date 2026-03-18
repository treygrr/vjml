<script setup lang="ts">
import { Body, Column, Mjml, Raw, Section, Text } from 'vjml'

const fileStartRaw = '<!-- file-start-marker --><% if (featureFlag) { %>'
</script>

<template>
  <Mjml lang="en">
    <Raw position="file-start" :html="fileStartRaw" />
    <Body background-color="#f6efe6" width="340px">
      <Section background-color="#fff9f1" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            File start raw fragment
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>