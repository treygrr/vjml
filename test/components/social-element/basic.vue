<script setup lang="ts">
import { Body, Column, Mjml, Section, Social, SocialElement } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Social font-size="15px" icon-size="30px" mode="horizontal">
            <SocialElement name="facebook" href="https://example.com/story">
              Facebook
            </SocialElement>
            <SocialElement name="github" href="https://example.com/code">
              GitHub
            </SocialElement>
          </Social>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>