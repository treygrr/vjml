<script setup lang="ts">
import {
  Attributes,
  Body,
  Class,
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
        <Class align="left" icon-size="24px" inner-padding="4px" name="social-row" padding="0px" />
        <Class color="#173540" font-size="14px" line-height="20px" name="social-link" text-padding="0px 10px 0px 8px" />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Social mj-class="social-row">
            <SocialElement mj-class="social-link" name="github" href="https://example.com/code">
              Code
            </SocialElement>
            <SocialElement color="#425d64" mj-class="social-link" name="medium" href="https://example.com/post">
              Post
            </SocialElement>
          </Social>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>