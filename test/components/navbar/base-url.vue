<script setup lang="ts">
import { Body, Column, Mjml, Navbar, NavbarLink, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Body background-color="#f3ede4" width="340px">
      <Section background-color="#fff8ef" padding="22px">
        <Column>
          <Navbar align="left" base-url="https://example.com/app" padding="0px">
            <NavbarLink color="#28414c" href="/reports">
              Reports
            </NavbarLink>
            <NavbarLink color="#28414c" href="/team/settings?mode=weekly" rel="nofollow">
              Team settings
            </NavbarLink>
          </Navbar>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>