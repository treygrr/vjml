<script setup lang="ts">
import { Attributes, Body, Button, Class, Column, Head, Mjml, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class
          background-color="#2563eb"
          border-radius="24px"
          color="#eff6ff"
          font-size="15px"
          font-weight="700"
          inner-padding="12px 20px"
          name="primary-cta"
        />
      </Attributes>
    </Head>
    <Body>
      <Section>
        <Column>
          <Button href="https://example.com/invoice" mj-class="primary-cta">
            Download invoice
          </Button>
          <Button
            background-color="#1d4ed8"
            href="https://example.com/billing"
            mj-class="primary-cta"
            padding="12px 25px 0px"
          >
            View billing history
          </Button>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>