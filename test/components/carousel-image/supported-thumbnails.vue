<script setup lang="ts">
import { Body, Carousel, CarouselImage, Column, Mjml, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f6eee4" width="340px">
      <Section background-color="#fffbf5" padding="20px">
        <Column>
          <Carousel
            padding="0px"
            tb-border="3px solid #d3b18d"
            tb-border-radius="12px"
            tb-width="72px"
            thumbnails="supported"
          >
            <CarouselImage alt="Supported slide one" href="https://example.com/stories/1" src="https://dummyimage.com/600x240/16353f/fffaf2.png&text=Story+1" thumbnails-src="https://dummyimage.com/144x96/16353f/fffaf2.png&text=S1" />
            <CarouselImage alt="Supported slide two" href="https://example.com/stories/2" src="https://dummyimage.com/600x240/c56f34/fffaf2.png&text=Story+2" thumbnails-src="https://dummyimage.com/144x96/c56f34/fffaf2.png&text=S2" />
            <CarouselImage alt="Supported slide three" href="https://example.com/stories/3" src="https://dummyimage.com/600x240/246f6d/fffaf2.png&text=Story+3" thumbnails-src="https://dummyimage.com/144x96/246f6d/fffaf2.png&text=S3" />
          </Carousel>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>