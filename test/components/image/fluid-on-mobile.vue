<script setup lang="ts">
import { Body, Column, Image, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Responsive source set
          </Text>

          <Image
            alt="Campaign banner"
            fluid-on-mobile="true"
            padding="14px 0px 10px"
            sizes="(max-width: 480px) 100vw, 280px"
            src="https://dummyimage.com/560x240/31566b/fffaf2.png&text=Desktop"
            srcset="https://dummyimage.com/320x160/31566b/fffaf2.png&text=Mobile 320w, https://dummyimage.com/560x240/31566b/fffaf2.png&text=Desktop 560w"
            width="280px"
          />
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>