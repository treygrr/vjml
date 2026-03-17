<script setup lang="ts">
import {
  Accordion,
  AccordionElement,
  AccordionText,
  AccordionTitle,
  Attributes,
  Body,
  Column,
  Head,
  Mjml,
  Section,
} from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Accordion border="1px solid #d8d8d8" padding="0px" />
        <AccordionElement
          icon-align="top"
          icon-height="18px"
          icon-position="left"
          icon-unwrapped-url="https://static.mailjet.com/mjml-website/documentation/accordion-arrow-up.png"
          icon-width="18px"
          icon-wrapped-url="https://static.mailjet.com/mjml-website/documentation/accordion-arrow-down.png"
        />
        <AccordionTitle background-color="#ffffff" color="#0f172a" font-size="16px" padding="14px" />
        <AccordionText background-color="#f8fafc" color="#334155" font-size="14px" padding="14px" />
      </Attributes>
    </Head>
    <Body>
      <Section>
        <Column>
          <Accordion>
            <AccordionElement>
              <AccordionTitle>Billing questions</AccordionTitle>
              <AccordionText>
                Review invoice timing, payment methods, and receipt access.
              </AccordionText>
            </AccordionElement>
            <AccordionElement>
              <AccordionTitle>Account changes</AccordionTitle>
              <AccordionText>
                Update your team seats, plan settings, and account details.
              </AccordionText>
            </AccordionElement>
          </Accordion>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>