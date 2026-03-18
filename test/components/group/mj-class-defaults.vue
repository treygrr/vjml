<script setup lang="ts">
import { Attributes, Body, Class, Column, Group, Mjml, Head, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class background-color="#fff7ed" name="paired-group" vertical-align="bottom" />
        <Class background-color="#f2e0cd" name="paired-column" width="50%" />
        <Class color="#173540" font-size="14px" line-height="21px" name="paired-copy" />
      </Attributes>
    </Head>
    <Body background-color="#f7efe6" width="340px">
      <Section padding="20px">
        <Group mj-class="paired-group">
          <Column mj-class="paired-column">
            <Text mj-class="paired-copy">
              Shared defaults keep grouped layouts consistent.
            </Text>
          </Column>

          <Column background-color="#ead4be" mj-class="paired-column">
            <Text mj-class="paired-copy">
              Variant-specific overrides still apply cleanly.
            </Text>
          </Column>
        </Group>
      </Section>
    </Body>
  </Mjml>
</template>