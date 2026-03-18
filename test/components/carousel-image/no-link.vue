<script setup lang="ts">
import { Body, Carousel, CarouselImage, Column, Mjml, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f4ede3" width="340px">
      <Section background-color="#fff9f1" padding="20px">
        <Column>
          <Carousel border-radius="12px" padding="0px" thumbnails="hidden">
            <CarouselImage alt="Static slide" src="https://dummyimage.com/600x220/16353f/fffaf2.png&text=Static" title="Static catalog" />
            <CarouselImage alt="Linked slide" href="https://example.com/catalog" rel="nofollow" src="https://dummyimage.com/600x220/8e5f3d/fffaf2.png&text=Catalog" title="Catalog" />
          </Carousel>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>