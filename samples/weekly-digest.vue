<script setup lang='ts'>
import {
  All,
  Attributes,
  Body,
  Button,
  Class,
  Column,
  Group,
  Head,
  Image,
  Mjml,
  Navbar,
  NavbarLink,
  Section,
  Spacer,
  Text,
  Wrapper,
} from 'vjml'
</script>

<template>
  <Mjml lang='en'>
    <Head>
      <Attributes>
        <All color='#425d64' font-size='14px' line-height='22px' />
        <Navbar align='left' padding='0px' />
        <NavbarLink color='#173540' padding='12px 8px' text-transform='none' />
        <Class name='eyebrow' color='#db7636' font-size='12px' font-weight='700' letter-spacing='0.18em' text-transform='uppercase' />
        <Class name='card-title' color='#173540' font-size='18px' font-weight='700' line-height='24px' />
      </Attributes>
    </Head>

    <Body background-color='#f7efe4' width='340px'>
      <Wrapper background-color='#fffaf2' padding='16px 0'>
        <Section padding='0px 22px 10px'>
          <Column>
            <Navbar>
              <NavbarLink href='https://example.com/overview'>Overview</NavbarLink>
              <NavbarLink href='https://example.com/issues'>Issues</NavbarLink>
              <NavbarLink href='https://example.com/usage'>Usage</NavbarLink>
            </Navbar>
          </Column>
        </Section>

        <Section padding='0px 22px 18px'>
          <Group>
            <Column width='50%' padding='0px 8px 0px 0px'>
              <Text mj-class='eyebrow'>Feature</Text>
              <Text mj-class='card-title'>Rendered previews</Text>
              <Spacer height='8px' />
              <Image alt='Preview frame' padding='0px' src='https://dummyimage.com/240x140/16353f/fffaf2.png&text=Preview' width='140px' />
            </Column>
            <Column width='50%' padding='0px 0px 0px 8px'>
              <Text mj-class='eyebrow'>Update</Text>
              <Text mj-class='card-title'>Test snapshots</Text>
              <Spacer height='8px' />
              <Image alt='Snapshot diff' padding='0px' src='https://dummyimage.com/240x140/db7636/fffaf2.png&text=Snapshots' width='140px' />
            </Column>
          </Group>
        </Section>

        <Section background-color='#fff5ea' padding='14px 22px 22px'>
          <Column>
            <Text mj-class='eyebrow'>Ship faster</Text>
            <Text mj-class='card-title'>Reusable layout primitives are now parity-tested in the browser.</Text>
            <Spacer height='10px' />
            <Button
              align='left'
              background-color='#16353f'
              border-radius='999px'
              color='#fffaf2'
              href='https://example.com/changelog'
              inner-padding='10px 16px'
            >
              See changelog
            </Button>
          </Column>
        </Section>
      </Wrapper>
    </Body>
  </Mjml>
</template>