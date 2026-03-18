<script setup lang="ts">
import { Attributes, Body, Column, Group, Head, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Group background-color="#fff8ee" direction="rtl" vertical-align="middle" />
        <Column width="50%" />
        <Text color="#173540" font-size="15px" line-height="22px" />
      </Attributes>
    </Head>
    <Body background-color="#f6efe7" width="340px">
      <Section padding="20px">
        <Group>
          <Column>
            <Text>
              Priority tasks stay visible together.
            </Text>
          </Column>

          <Column>
            <Text>
              Head attributes drive the group wrapper defaults.
            </Text>
          </Column>
        </Group>
      </Section>
    </Body>
  </Mjml>
</template>