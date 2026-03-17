<script setup lang="ts">
import { Body, Column, Mjml, Section, Spacer, Table, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f4efe7" width="340px">
      <Section background-color="#fff8ef" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Auto-width pricing table
          </Text>

          <Spacer height="12px" />

          <Table
            border="1px solid #db7636"
            cellpadding="8"
            cellspacing="0"
            color="#173540"
            font-size="13px"
            padding="0px"
            width="auto"
          >
            <tr><td><strong>Seat</strong></td><td>$24</td></tr>
            <tr><td><strong>Storage</strong></td><td>2 TB</td></tr>
          </Table>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>