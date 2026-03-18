<script setup lang='ts'>
import {
  Body,
  Button,
  Column,
  Font,
  Head,
  Hero,
  Mjml,
  Preview,
  Section,
  Social,
  SocialElement,
  Spacer,
  Style,
  Text,
  Title,
} from 'vjml'
</script>

<template>
  <Mjml lang='en'>
    <Head>
      <Title>Launch week update</Title>
      <Preview>The new preview workspace is live with email-safe rendering.</Preview>
      <Font name='Lora' href='https://fonts.googleapis.com/css?family=Lora:400,700' />
      <Style inline='inline'>
        div[role='article'] {
          border: 2px solid #d1b18d !important;
        }
      </Style>
    </Head>

    <Body background-color='#f6efe7' width='340px'>
      <Hero
        background-color='#16353f'
        background-height='240px'
        background-url='https://dummyimage.com/960x420/16353f/fffaf2.png&text=Launch+Week'
        background-width='340px'
        inner-padding='22px'
        mode='fluid-height'
        padding='0px'
        vertical-align='top'
      >
        <Text color='#fff5e8' font-family='Lora, Georgia, serif' font-size='26px' font-weight='700' line-height='32px'>
          Launch week is live
        </Text>
        <Spacer height='10px' />
        <Text color='#e8d9ca' font-size='14px' line-height='22px'>
          Preview the ported component library in a real email shell and compare the HTML against official MJML.
        </Text>
        <Spacer height='14px' />
        <Button
          align='left'
          background-color='#db7636'
          border-radius='999px'
          color='#fffaf2'
          href='https://example.com/workspace'
          inner-padding='10px 16px'
        >
          Open workspace
        </Button>
      </Hero>

      <Section background-color='#fff9f1' padding='18px 22px 24px'>
        <Column>
          <Text color='#173540' font-size='15px' font-weight='700' line-height='22px'>
            Follow the rollout
          </Text>
          <Spacer height='8px' />
          <Social align='left' icon-size='20px' mode='horizontal' padding='0px'>
            <SocialElement name='github' href='https://example.com/github'>
              GitHub
            </SocialElement>
            <SocialElement name='linkedin' href='https://example.com/changelog'>
              Changelog
            </SocialElement>
          </Social>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>