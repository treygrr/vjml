<script setup lang="ts">
import {
  Attributes,
  Body,
  Button,
  Class,
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
        <Class
          name="feature-column"
          background-color="#16353f"
          padding="16px"
          vertical-align="middle"
        >
          <Text color="#fff5e8" font-size="15px" line-height="22px" />
          <Button
            background-color="#f3c49a"
            color="#25404a"
            inner-padding="9px 15px"
          />
        </Class>
      </Attributes>
    </Head>
    <Body width="340px" background-color="#f5eee6">
      <Section background-color="#fffaf5" padding="22px">
        <Column mj-class="feature-column">
          <Text>
            Class child defaults can style descendants inside the matching container.
          </Text>
          <Spacer height="10px" />
          <Button href="https://example.com/explore">
            Explore
          </Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>