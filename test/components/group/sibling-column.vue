<script setup lang="ts">
import { Body, Column, Group, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f6efe7" width="340px">
      <Section background-color="#fffaf2" padding="20px">
        <Group background-color="#f3e2d1" width="66%">
          <Column width="50%">
            <Text color="#173540" font-size="16px" font-weight="700" line-height="22px">
              Paired left
            </Text>

            <Spacer height="8px" />

            <Text color="#425d64" font-size="13px" line-height="20px">
              This content shares the wider grouped area.
            </Text>
          </Column>

          <Column width="50%">
            <Text color="#173540" font-size="16px" font-weight="700" line-height="22px">
              Paired right
            </Text>

            <Spacer height="8px" />

            <Text color="#425d64" font-size="13px" line-height="20px">
              Width calculations should stay aligned in Outlook.
            </Text>
          </Column>
        </Group>

        <Column background-color="#173540" width="34%">
          <Text color="#fff8ef" font-size="16px" font-weight="700" line-height="22px">
            Aside
          </Text>

          <Spacer height="8px" />

          <Text color="#dfe9e6" font-size="13px" line-height="20px">
            A standalone column sits beside the group.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>