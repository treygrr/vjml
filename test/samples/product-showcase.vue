<script setup lang='ts'>
import {
  Body,
  Button,
  Carousel,
  CarouselImage,
  Column,
  Divider,
  Head,
  HtmlAttribute,
  HtmlAttributes,
  Mjml,
  Section,
  Selector,
  Spacer,
  Text,
} from 'vjml'
</script>

<template>
  <Mjml lang='en'>
    <Head>
      <HtmlAttributes>
        <Selector path="div[role='article']">
          <HtmlAttribute name='data-sample'>product-showcase</HtmlAttribute>
        </Selector>
        <Selector path='.showcase-note div'>
          <HtmlAttribute name='data-block'>note</HtmlAttribute>
        </Selector>
      </HtmlAttributes>
    </Head>

    <Body background-color='#f5eee5' width='340px'>
      <Section background-color='#fffaf4' padding='20px 22px 12px'>
        <Column>
          <Text color='#173540' font-size='22px' font-weight='700' line-height='28px'>
            Product showcase
          </Text>
          <Spacer height='8px' />
          <Text css-class='showcase-note' color='#425d64' font-size='14px' line-height='22px'>
            Use this sample to compare root selectors, carousel output, and post-body CTA composition.
          </Text>
        </Column>
      </Section>

      <Section background-color='#fffaf4' padding='0px 22px 18px'>
        <Column>
          <Carousel
            padding='0px'
            tb-border='3px solid #d8c1a3'
            tb-border-radius='14px'
            tb-width='72px'
            thumbnails='supported'
          >
            <CarouselImage alt='Showcase one' href='https://example.com/gallery/1' src='https://dummyimage.com/600x220/16353f/fffaf2.png&text=Gallery+1' thumbnails-src='https://dummyimage.com/144x96/16353f/fffaf2.png&text=G1' />
            <CarouselImage alt='Showcase two' href='https://example.com/gallery/2' src='https://dummyimage.com/600x220/b96b37/fffaf2.png&text=Gallery+2' thumbnails-src='https://dummyimage.com/144x96/b96b37/fffaf2.png&text=G2' />
            <CarouselImage alt='Showcase three' href='https://example.com/gallery/3' src='https://dummyimage.com/600x220/246f6d/fffaf2.png&text=Gallery+3' thumbnails-src='https://dummyimage.com/144x96/246f6d/fffaf2.png&text=G3' />
          </Carousel>
        </Column>
      </Section>

      <Section background-color='#fff6ec' padding='0px 22px 22px'>
        <Column>
          <Divider border-color='#d9c5ad' border-width='1px' padding='12px 0px' />
          <Button
            align='left'
            background-color='#16353f'
            border-radius='999px'
            color='#fffaf2'
            href='https://example.com/gallery'
            inner-padding='10px 16px'
          >
            View collection
          </Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>