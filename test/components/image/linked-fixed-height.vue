<script setup lang="ts">
import { Body, Column, Image, Mjml, Section, Text } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f4efe7" width="340px">
      <Section background-color="#fff8ef" padding="20px">
        <Column>
          <Text color="#173540" font-size="15px" font-weight="700" line-height="22px">
            Linked media card
          </Text>

          <Image
            alt="Editorial tile"
            border="2px solid #db7636"
            border-radius="12px"
            container-background-color="#fff2e7"
            height="92px"
            href="https://example.com/story"
            name="story-link"
            padding="14px 0px 10px"
            rel="noopener"
            src="https://dummyimage.com/280x184/fbe8d7/173540.png&text=Read+More"
            target="_self"
            title="Read more"
            width="140px"
          />
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>