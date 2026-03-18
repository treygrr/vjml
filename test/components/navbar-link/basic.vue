<script setup lang="ts">
import { Body, Column, Mjml, Navbar, NavbarLink, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Navbar align="left" padding="0px">
            <NavbarLink color="#16353f" href="https://example.com/overview">
              Overview
            </NavbarLink>
          </Navbar>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>