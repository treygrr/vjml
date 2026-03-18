<script setup lang='ts'>
import {
  Accordion,
  AccordionElement,
  AccordionText,
  AccordionTitle,
  Body,
  Button,
  Column,
  Head,
  Mjml,
  Preview,
  Raw,
  Section,
  Spacer,
  Text,
} from 'vjml'

const fileStartRaw = '<!-- support-template-start -->'
</script>

<template>
  <Mjml lang='en'>
    <Raw position='file-start' :html='fileStartRaw' />

    <Head>
      <Preview>Answers to the most common setup questions.</Preview>
    </Head>

    <Body background-color='#f4ede4' width='340px'>
      <Section background-color='#fff9f1' padding='22px'>
        <Column>
          <Text color='#173540' font-size='22px' font-weight='700' line-height='28px'>
            Support checklist
          </Text>
          <Spacer height='8px' />
          <Text color='#425d64' font-size='14px' line-height='22px'>
            Start with the quick answers below, then open the full guide for the remaining edge cases.
          </Text>
          <Spacer height='14px' />
          <Accordion>
            <AccordionElement>
              <AccordionTitle>Where do parity snapshots get written?</AccordionTitle>
              <AccordionText>
                Each sample writes raw and normalized MJML and VJML output into the samples snapshots folder.
              </AccordionText>
            </AccordionElement>
            <AccordionElement>
              <AccordionTitle>How do I preview the rendered email?</AccordionTitle>
              <AccordionText>
                Use the playground for visual checks and the parity suite for exact HTML comparison.
              </AccordionText>
            </AccordionElement>
          </Accordion>
          <Spacer height='14px' />
          <Button
            align='left'
            background-color='#db7636'
            border-radius='999px'
            color='#fffaf2'
            href='https://example.com/help'
            inner-padding='10px 16px'
          >
            Open help center
          </Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>