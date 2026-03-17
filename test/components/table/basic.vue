<script setup lang="ts">
import { Body, Column, Mjml, Section, Table } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Table
            cellpadding="6"
            cellspacing="0"
            color="#173540"
            font-size="14px"
            padding="0px"
            role="presentation"
            width="100%"
          >
            <tr><td><strong>Plan</strong></td><td>Pro</td></tr>
            <tr><td><strong>Status</strong></td><td>Active</td></tr>
            <tr><td><strong>Renewal</strong></td><td>May 27</td></tr>
          </Table>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>