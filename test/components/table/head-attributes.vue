<script setup lang="ts">
import { Attributes, Body, Column, Head, Mjml, Section, Spacer, Table, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Table cellpadding="6" color="#425d64" font-size="13px" line-height="20px" padding="0px" />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Shared table defaults
          </Text>

          <Spacer height="12px" />

          <Table>
            <tr><td><strong>Segment</strong></td><td>Lifecycle</td></tr>
            <tr><td><strong>Send</strong></td><td>Weekly</td></tr>
          </Table>

          <Spacer height="12px" />

          <Table color="#173540" width="auto">
            <tr><td><strong>Owner</strong></td><td>Growth</td></tr>
          </Table>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>