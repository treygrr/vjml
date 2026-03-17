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
              <AccordionText>
                A title is missing from this row, so the runtime needs to synthesize one.
              </AccordionText>
            </AccordionElement>
            <AccordionElement>
              <AccordionTitle>A body is missing from this row.</AccordionTitle>
            </AccordionElement>
          </Accordion>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>