<script setup lang="ts">
import { Attributes, Body, Class, Column, Head, Mjml, Section, Spacer, Table, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class
          cellpadding="6"
          color="#425d64"
          font-size="13px"
          line-height="20px"
          name="meta-table"
          padding="0px"
          width="100%"
        />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Class-backed table
          </Text>

          <Spacer height="12px" />

          <Table mj-class="meta-table">
            <tr><td><strong>Audience</strong></td><td>Customers</td></tr>
            <tr><td><strong>Locale</strong></td><td>Global</td></tr>
          </Table>

          <Spacer height="12px" />

          <Table border="1px solid #db7636" mj-class="meta-table" width="auto">
            <tr><td><strong>Version</strong></td><td>Spring</td></tr>
          </Table>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>