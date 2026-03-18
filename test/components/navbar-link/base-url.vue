<script setup lang="ts">
import { Body, Column, Mjml, Navbar, NavbarLink, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f7efe4" width="340px">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Navbar align="left" base-url="https://example.com/account" padding="0px">
            <NavbarLink color="#173540" href="/billing" rel="nofollow">
              Billing
            </NavbarLink>
            <NavbarLink color="#425d64" href="/notifications" target="_self">
              Notifications
            </NavbarLink>
          </Navbar>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>