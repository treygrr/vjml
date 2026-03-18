<script setup lang="ts">
import { Attributes, Body, Column, Head, Mjml, Navbar, NavbarLink, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Navbar align="left" padding="0px" />
        <NavbarLink color="#173540" font-size="14px" letter-spacing="0.2px" text-transform="none" />
      </Attributes>
    </Head>
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Navbar>
            <NavbarLink href="https://example.com/account">
              Account
            </NavbarLink>
            <NavbarLink color="#425d64" href="https://example.com/notifications">
              Notifications
            </NavbarLink>
          </Navbar>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>