<script setup lang="ts">
import { Body, Column, Group, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe5" width="340px">
      <Section background-color="#fff8ef" padding="18px">
        <Group background-color="#f4e3d3" width="50%">
          <Column width="50%">
            <Text color="#173540" font-size="14px" font-weight="700" line-height="20px">
              North
            </Text>
          </Column>

          <Column width="50%">
            <Text color="#173540" font-size="14px" font-weight="700" line-height="20px">
              South
            </Text>
          </Column>
        </Group>

        <Group background-color="#efe0cf" width="50%">
          <Column width="50%">
            <Text color="#173540" font-size="14px" font-weight="700" line-height="20px">
              East
            </Text>
          </Column>

          <Column width="50%">
            <Text color="#173540" font-size="14px" font-weight="700" line-height="20px">
              West
            </Text>
          </Column>
        </Group>
      </Section>
    </Body>
  </Mjml>
</template>