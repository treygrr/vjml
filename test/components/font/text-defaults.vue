<script setup lang="ts">
import {
  Attributes,
  Body,
  Column,
  Font,
  Head,
  Mjml,
  Section,
  Spacer,
  Text,
} from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Font
        href="https://fonts.googleapis.com/css?family=Merriweather:400,700"
        name="Merriweather"
      />
      <Attributes>
        <Text
          color="#173540"
          font-family="Merriweather, Georgia, serif"
          font-size="15px"
          line-height="22px"
        />
      </Attributes>
    </Head>
    <Body background-color="#f6efe7" width="340px">
      <Section background-color="#fff8ef" padding="22px">
        <Column>
          <Text>
            Shared text defaults can reference a declared font without repeating the font-family on every node.
          </Text>
          <Spacer height="10px" />
          <Text>
            The font import should still appear because the resolved output uses Merriweather.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>