<script setup lang="ts">
import {
  Accordion,
  AccordionElement,
  AccordionText,
  AccordionTitle,
  Attributes,
  Body,
  Class as MjClass,
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
        <MjClass name="faq-theme" border="none" padding="1px">
          <AccordionTitle background-color="#eef2ff" color="#1e3a8a" font-size="16px" padding="12px" />
          <AccordionText background-color="#ffffff" color="#334155" font-size="14px" padding="12px" />
        </MjClass>
      </Attributes>
    </Head>
    <Body>
      <Section>
        <Column>
          <Accordion mj-class="faq-theme">
            <AccordionElement>
              <AccordionTitle>Delivery windows</AccordionTitle>
              <AccordionText>
                Choose a weekday delivery window that best matches your schedule.
              </AccordionText>
            </AccordionElement>
            <AccordionElement>
              <AccordionTitle>Pickup lockers</AccordionTitle>
              <AccordionText>
                Switch to a local pickup locker if home delivery is unavailable.
              </AccordionText>
            </AccordionElement>
          </Accordion>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>