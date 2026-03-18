<script setup lang="ts">
import { Body, Carousel, CarouselImage, Column, Mjml, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Carousel padding="0px" thumbnails="visible">
            <CarouselImage alt="Carousel slide one" href="https://example.com/one" src="https://dummyimage.com/600x240/16353f/fffaf2.png&text=Carousel+1" />
            <CarouselImage alt="Carousel slide two" href="https://example.com/two" src="https://dummyimage.com/600x240/db7636/fffaf2.png&text=Carousel+2" />
            <CarouselImage alt="Carousel slide three" href="https://example.com/three" src="https://dummyimage.com/600x240/0c7a7f/fffaf2.png&text=Carousel+3" />
          </Carousel>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>