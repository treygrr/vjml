<script setup lang="ts">
import {
  Accordion,
  AccordionElement,
  AccordionText,
  AccordionTitle,
  Body,
  Column,
  Mjml,
  Section,
} from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body>
      <Section>
        <Column>
          <Accordion>
            <AccordionElement>
              <AccordionTitle>Shipping updates</AccordionTitle>
              <AccordionText>
                Track the latest status of your order without leaving your inbox.
              </AccordionText>
            </AccordionElement>
            <AccordionElement>
              <AccordionTitle>Returns</AccordionTitle>
              <AccordionText>
                Start a return within 30 days and print your label online.
              </AccordionText>
            </AccordionElement>
          </Accordion>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>