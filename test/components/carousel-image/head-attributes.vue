<script setup lang="ts">
import { Attributes, Body, Carousel, CarouselImage, Column, Head, Mjml, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Carousel border-radius="14px" icon-width="36px" padding="0px" tb-border="3px solid #d8c1a3" tb-border-radius="14px" thumbnails="visible" />
        <CarouselImage border-radius="14px" target="_self" />
      </Attributes>
    </Head>
    <Body background-color="#f5eee5" width="340px">
      <Section background-color="#fffaf4" padding="20px">
        <Column>
          <Carousel>
            <CarouselImage alt="Head defaults slide one" href="https://example.com/account/overview" src="https://dummyimage.com/600x220/16353f/fffaf2.png&text=Overview" />
            <CarouselImage alt="Head defaults slide two" href="https://example.com/account/preferences" src="https://dummyimage.com/600x220/9a6a41/fffaf2.png&text=Preferences" target="_blank" />
          </Carousel>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>