<script setup lang="ts">
import { Body, Column, Mjml, Navbar, NavbarLink, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f6efe7" width="340px">
      <Section background-color="#fffaf2" padding="22px">
        <Column>
          <Navbar align="left" padding="0px">
            <NavbarLink color="#173540" href="https://example.com/docs" text-transform="none">
              <span>Read <strong>the guide</strong></span>
            </NavbarLink>
          </Navbar>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>