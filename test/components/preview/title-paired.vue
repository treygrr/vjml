<script setup lang="ts">
import { Body, Column, Head, Mjml, Preview, Section, Text, Title } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Title>Weekly digest</Title>
      <Preview>Preview and title should coexist cleanly.</Preview>
    </Head>
    <Body background-color="#f7efe6" width="340px">
      <Section background-color="#fffaf2" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Title and preview
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>