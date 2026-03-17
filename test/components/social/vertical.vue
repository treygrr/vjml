<script setup lang="ts">
import { Body, Column, Mjml, Section, Social, SocialElement } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f4efe7" width="340px">
      <Section background-color="#fff8ef" padding="20px">
        <Column>
          <Social
            align="left"
            color="#173540"
            icon-size="24px"
            inner-padding="6px"
            mode="vertical"
            text-padding="0px 0px 0px 10px"
          >
            <SocialElement name="instagram" href="https://example.com/gallery">
              Instagram
            </SocialElement>
            <SocialElement icon-position="right" name="youtube" href="https://example.com/watch">
              Watch now
            </SocialElement>
          </Social>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>