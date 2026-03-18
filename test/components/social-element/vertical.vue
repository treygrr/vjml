<script setup lang="ts">
import { Body, Column, Mjml, Section, Social, SocialElement } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Social align="left" icon-size="24px" mode="vertical">
            <SocialElement name="linkedin" href="https://example.com/profile">
              LinkedIn
            </SocialElement>
            <SocialElement name="x" href="https://example.com/post">
              Updates
            </SocialElement>
          </Social>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>