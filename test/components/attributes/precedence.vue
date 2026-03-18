<script setup lang="ts">
import {
  All,
  Attributes,
  Body,
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
        <All color="#6b7280" font-size="14px" line-height="22px" />
        <Text color="#173540" font-size="15px" />
        <Class name="accent" color="#db7636" font-weight="700" />
        <Class name="caps" letter-spacing="0.12em" text-transform="uppercase" />
      </Attributes>
    </Head>
    <Body width="340px" background-color="#f4ede4">
      <Section background-color="#fff9f1" padding="22px">
        <Column>
          <Text mj-class="accent">
            Class values override tag and global defaults.
          </Text>
          <Spacer height="8px" />
          <Text color="#31566b" font-size="16px" mj-class="accent caps">
            Explicit values still win while other class attributes merge in.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>