<script setup lang="ts">
import { Attributes, Body, Column, Head, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Column background-color="#fff8ef" padding="12px" vertical-align="middle" />
        <Text color="#173540" font-size="14px" line-height="20px" />
      </Attributes>
    </Head>
    <Body background-color="#f3efe8" width="340px">
      <Section padding="14px">
        <Column width="50%">
          <Text font-weight="700">
            Inherited defaults
          </Text>

          <Spacer height="8px" />

          <Text>
            Column background and padding come from head attributes.
          </Text>
        </Column>

        <Column width="50%" background-color="#f1e2d1" padding="16px 12px">
          <Text font-weight="700">
            Explicit override
          </Text>

          <Spacer height="8px" />

          <Text>
            Direct column attributes should override the inherited background and spacing.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>