<script setup lang="ts">
import {
  Attributes,
  Body,
  Column,
  Head,
  Mjml,
  Section,
  Social,
  SocialElement,
} from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Social align="left" color="#173540" icon-size="24px" inner-padding="4px" padding="0px" />
        <SocialElement font-size="14px" line-height="20px" text-padding="0px 10px 0px 8px" />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Social>
            <SocialElement name="facebook" href="https://example.com/news">
              Social defaults
            </SocialElement>
            <SocialElement color="#425d64" name="linkedin" href="https://example.com/news">
              Explicit override
            </SocialElement>
          </Social>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>