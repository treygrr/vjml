<script setup lang="ts">
import { Attributes, Body, Class, Column, Head, Mjml, Section, Text, Wrapper } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class background-color="#fff2e7" border-radius="20px" name="card-wrap" padding="16px 0px" />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Wrapper mj-class="card-wrap">
        <Section background-color="#fffdf8">
          <Column>
            <Text color="#173540" font-size="16px" font-weight="700" line-height="24px">
              Class-backed wrapper
            </Text>
          </Column>
        </Section>
      </Wrapper>

      <Wrapper background-color="#fbe8d7" mj-class="card-wrap" padding="8px 0px 16px">
        <Section background-color="#fff8ef">
          <Column>
            <Text color="#173540" font-size="14px" line-height="22px">
              Explicit wrapper values should override the shared class defaults.
            </Text>
          </Column>
        </Section>
      </Wrapper>
    </Body>
  </Mjml>
</template>