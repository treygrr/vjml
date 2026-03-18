<script setup lang="ts">
import {
  All,
  Attributes,
  Body,
  Button,
  Column,
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
      <Attributes>
        <All color="#425d64" font-size="14px" line-height="22px" />
        <Text color="#173540" font-weight="700" />
        <Button
          background-color="#16353f"
          color="#fff8ef"
          inner-padding="10px 18px"
        />
      </Attributes>
    </Head>
    <Body width="340px" background-color="#f6efe7">
      <Section background-color="#fff8ef" padding="22px">
        <Column>
          <Text>
            Tag defaults stay scoped.
          </Text>
          <Spacer height="8px" />
          <Button href="https://example.com/review">
            Review plan
          </Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>