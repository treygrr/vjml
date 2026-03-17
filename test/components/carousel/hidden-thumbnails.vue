<script setup lang="ts">
import { Body, Carousel, CarouselImage, Column, Mjml, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f4ede3" width="340px">
      <Section background-color="#fff9f1" padding="20px">
        <Column>
          <Carousel
            border-radius="12px"
            icon-width="32px"
            left-icon="https://dummyimage.com/32x32/16353f/fffaf2.png&text=%3C"
            padding="0px"
            right-icon="https://dummyimage.com/32x32/16353f/fffaf2.png&text=%3E"
            thumbnails="hidden"
          >
            <CarouselImage alt="Hidden thumbnail slide one" href="https://example.com/collections" src="https://dummyimage.com/600x220/16353f/fffaf2.png&text=Collections" title="Collections" />
            <CarouselImage alt="Hidden thumbnail slide two" href="https://example.com/releases" rel="nofollow" src="https://dummyimage.com/600x220/8e5f3d/fffaf2.png&text=Releases" title="Releases" />
          </Carousel>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>