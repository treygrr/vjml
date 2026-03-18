<script setup lang="ts">
import { Attributes, Body, Carousel, CarouselImage, Class, Column, Head, Mjml, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class
          name="carousel-shell"
          border-radius="10px"
          icon-width="38px"
          padding="0px"
          tb-border="2px solid #c58d59"
          tb-border-radius="10px"
          thumbnails="supported"
        />
        <Class
          name="carousel-item"
          border-radius="10px"
          target="_self"
          tb-border-radius="10px"
        />
      </Attributes>
    </Head>
    <Body background-color="#f6efe7" width="340px">
      <Section background-color="#fff9f2" padding="20px">
        <Column>
          <Carousel mj-class="carousel-shell">
            <CarouselImage alt="Class defaults slide one" href="https://example.com/docs/start" mj-class="carousel-item" src="https://dummyimage.com/600x220/16353f/fffaf2.png&text=Start" thumbnails-src="https://dummyimage.com/144x96/16353f/fffaf2.png&text=Start" />
            <CarouselImage alt="Class defaults slide two" href="https://example.com/docs/update" mj-class="carousel-item" src="https://dummyimage.com/600x220/b96b37/fffaf2.png&text=Update" target="_blank" thumbnails-src="https://dummyimage.com/144x96/b96b37/fffaf2.png&text=Update" />
          </Carousel>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>