<script setup lang="ts">
import { Attributes, Body, Class, Column, Head, Mjml, Section, Spacer, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class
          background-color="#16353f"
          border-radius="18px"
          name="feature-column"
          padding="16px"
          vertical-align="middle"
        />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section padding="16px">
        <Column mj-class="feature-column" width="50%">
          <Text color="#fff5e8" font-size="16px" font-weight="700" line-height="24px">
            Class-backed column
          </Text>

          <Spacer height="8px" />

          <Text color="#d9e3df" font-size="14px" line-height="22px">
            This column relies on the shared class defaults.
          </Text>
        </Column>

        <Column background-color="#31566b" mj-class="feature-column" padding="10px 16px 16px" width="50%">
          <Text color="#fff5e8" font-size="16px" font-weight="700" line-height="24px">
            Override after merge
          </Text>

          <Spacer height="8px" />

          <Text color="#d9e3df" font-size="14px" line-height="22px">
            Explicit column values should still win after the class is applied.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>