<script setup lang="ts">
import { Body, Column, Head, Mjml, Section, Spacer, Style, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Style inline="inline">
        .preserve-text div {
          color:#db7636;
        }
      </Style>
    </Head>
    <Body width="340px" background-color="#f5eee6">
      <Section background-color="#fffaf5" padding="22px">
        <Column>
          <Text css-class="preserve-text" color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Existing inline color wins
          </Text>
          <Spacer height="8px" />
          <Text color="#425d64" font-size="14px" line-height="22px">
            Non-important inline stylesheet rules should not replace explicit component styles already in the markup.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>