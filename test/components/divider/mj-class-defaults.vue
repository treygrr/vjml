<script setup lang="ts">
import { Attributes, Body, Class, Column, Divider, Head, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class
          align="center"
          border-color="#db7636"
          border-style="dotted"
          border-width="2px"
          name="section-rule"
          padding="16px 0px"
          width="72%"
        />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Class-backed divider
          </Text>

          <Divider mj-class="section-rule" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            The first divider uses the shared class defaults without extra attributes.
          </Text>

          <Divider
            align="right"
            border-color="#173540"
            mj-class="section-rule"
            padding="20px 0px 0px"
            width="48%"
          />
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>