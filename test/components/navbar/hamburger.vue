<script setup lang="ts">
import { Body, Column, Mjml, Navbar, NavbarLink, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f5ede3" width="340px">
      <Section background-color="#fffdf8" padding="20px">
        <Column>
          <Navbar
            align="center"
            hamburger="hamburger"
            ico-align="center"
            ico-color="#16353f"
            ico-font-size="24px"
            ico-line-height="24px"
            ico-padding="8px"
            ico-text-decoration="none"
            padding="0px"
          >
            <NavbarLink color="#16353f" href="https://example.com/products">
              Products
            </NavbarLink>
            <NavbarLink color="#16353f" href="https://example.com/pricing">
              Pricing
            </NavbarLink>
            <NavbarLink color="#16353f" href="https://example.com/contact">
              Contact
            </NavbarLink>
          </Navbar>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>