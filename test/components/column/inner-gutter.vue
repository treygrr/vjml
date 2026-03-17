<script setup lang="ts">
import { Body, Column, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body width="340px" background-color="#f5efe7">
      <Section padding="16px">
        <Column
          background-color="#ece3d7"
          border="1px solid #d2c5b6"
          border-radius="18px"
          inner-background-color="#fffaf2"
          inner-border="1px solid #eadfce"
          inner-border-radius="12px"
          padding="14px"
        >
          <Text color="#173540" font-size="17px" font-weight="700" line-height="24px">
            Padded card column
          </Text>

          <Spacer height="8px" />

          <Text color="#4e5d63" font-size="14px" line-height="22px">
            Padding on the column should create an outer shell and an inner content table.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>