<script setup lang="ts">
import { Body, Column, Mjml, Section, Social, SocialElement } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Social align="left" icon-size="22px" mode="horizontal">
            <SocialElement
              alt="Docs icon"
              background-color="#16353f"
              href="https://example.com/docs"
              icon-height="22px"
              icon-padding="5px"
              name="web"
              padding="0px"
              text-padding="0px 12px 0px 8px"
              title="Read docs"
            >
              Docs
            </SocialElement>
            <SocialElement
              align="left"
              alt="Custom icon"
              background-color="#fff2e7"
              color="#173540"
              icon-position="right"
              icon-size="24px"
              padding="0px"
              sizes="24px"
              src="https://dummyimage.com/24x24/db7636/fffaf2.png&text=C"
              srcset="https://dummyimage.com/48x48/db7636/fffaf2.png&text=C 2x"
            >
              Custom asset
            </SocialElement>
          </Social>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>