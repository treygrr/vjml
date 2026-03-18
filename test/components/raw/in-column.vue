<script setup lang="ts">
import { Body, Column, Mjml, Raw, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f6efe7" width="340px">
      <Section background-color="#fffaf2" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Mixed content
          </Text>

          <Raw>
            <table role="presentation" width="100%" style="margin-top:12px;border:2px dashed #d1b18d;border-radius:14px;background:#f6ecdf;">
              <tr>
                <td style="padding:12px 14px;color:#173540;font-size:13px;line-height:20px;">
                  Raw table markup between MJML blocks.
                </td>
              </tr>
            </table>
          </Raw>

          <Text color="#425d64" font-size="13px" line-height="20px">
            This confirms raw children survive inside a column.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>