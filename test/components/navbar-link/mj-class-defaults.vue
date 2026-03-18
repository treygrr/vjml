<script setup lang="ts">
import { Attributes, Body, Class, Column, Head, Mjml, Navbar, NavbarLink, Section } from 'vjml'
</script>

<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Class align="left" name="nav-row" padding="0px" />
        <Class color="#173540" font-size="14px" letter-spacing="0.3px" name="nav-link" text-transform="none" />
      </Attributes>
    </Head>
    <Body background-color="#f6efe7" width="340px">
      <Section background-color="#fffaf2" padding="22px">
        <Column>
          <Navbar mj-class="nav-row">
            <NavbarLink href="https://example.com/docs" mj-class="nav-link">
              Docs
            </NavbarLink>
            <NavbarLink color="#425d64" href="https://example.com/changelog" mj-class="nav-link">
              Changelog
            </NavbarLink>
          </Navbar>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>