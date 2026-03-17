<script setup lang="ts">
import { Body, Column, Mjml, Section, Table, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Comparison grid
          </Text>

          <Table
            cellpadding="10"
            cellspacing="6"
            color="#425d64"
            font-size="13px"
            line-height="20px"
            padding="12px 0px 0px"
            table-layout="fixed"
            width="100%"
          >
            <tr>
              <td style="background:#fff2e7"><strong>Region</strong></td>
              <td style="background:#fff2e7"><strong>Opens</strong></td>
            </tr>
            <tr>
              <td>North America</td>
              <td>42%</td>
            </tr>
          </Table>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>