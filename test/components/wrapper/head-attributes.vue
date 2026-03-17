<script setup lang="ts">
import { Attributes, Body, Column, Head, Mjml, Section, Text, Wrapper } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Wrapper background-color="#fff7ed" padding="12px 0px" />
        <Section background-color="#ffffff" padding="16px" />
        <Text color="#173540" font-size="14px" line-height="22px" />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Wrapper>
        <Section>
          <Column>
            <Text font-weight="700">
              Wrapper defaults
            </Text>
          </Column>
        </Section>

        <Section background-color="#fdf2e8">
          <Column>
            <Text>
              Wrapper and section defaults from head attributes should apply before explicit overrides.
            </Text>
          </Column>
        </Section>
      </Wrapper>
    </Body>
  </Mjml>
</template>