<script setup lang="ts">
import { Body, Column, Font, Head, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Font
        href="https://fonts.googleapis.com/css?family=Raleway:400,700"
        name="Raleway"
      />
    </Head>
    <Body background-color="#f5eee6" width="340px">
      <Section background-color="#fffaf5" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Unused font declaration
          </Text>
          <Spacer height="10px" />
          <Text color="#425d64" font-size="14px" line-height="22px">
            The head declaration should not emit import tags until a rendered node references the custom family.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>