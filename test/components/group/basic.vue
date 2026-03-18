<script setup lang="ts">
import { Body, Column, Group, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section padding="20px">
        <Group background-color="#fff9f1">
          <Column width="50%">
            <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
              Feature A
            </Text>

            <Spacer height="10px" />

            <Text color="#425d64" font-size="14px" line-height="22px">
              Keep related columns together as a grouped row.
            </Text>
          </Column>

          <Column width="50%">
            <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
              Feature B
            </Text>

            <Spacer height="10px" />

            <Text color="#425d64" font-size="14px" line-height="22px">
              Group is useful when you want columns to stay visually paired.
            </Text>
          </Column>
        </Group>
      </Section>
    </Body>
  </Mjml>
</template>