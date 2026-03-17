<script setup lang="ts">
import { Body, Button, Column, Mjml, Section, Spacer, Text, Wrapper } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body width="340px" background-color="#f7efe4">
      <Wrapper background-color="#fff2e7" padding="16px 0">
        <Section background-color="#fffdf8">
          <Column>
            <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
              Wrapper groups sections
            </Text>

            <Spacer height="10px" />

            <Text color="#425d64" font-size="14px" line-height="22px">
              Use Wrapper when you want a shared background or border treatment around multiple sections.
            </Text>
          </Column>
        </Section>

        <Section background-color="#fff8ef">
          <Column>
            <Button
              align="left"
              background-color="#16353f"
              border-radius="999px"
              color="#fffaf2"
              href="https://example.com"
              inner-padding="10px 16px"
            >
              Take action
            </Button>
          </Column>
        </Section>
      </Wrapper>
    </Body>
  </Mjml>
</template>