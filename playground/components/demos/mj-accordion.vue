<template>
  <Mjml lang="en">
    <Body width="340px" background-color="#f7efe4">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Accordion padding="0px">
            <AccordionElement>
              <AccordionTitle>
                What changed?
              </AccordionTitle>
              <AccordionText>
                The plugin now exports the full copied runtime and a plain Vue renderer.
              </AccordionText>
            </AccordionElement>

            <AccordionElement>
              <AccordionTitle>
                How do I render email HTML?
              </AccordionTitle>
              <AccordionText>
                Pass a Vue component to createVjmlRenderer().renderToHtml().
              </AccordionText>
            </AccordionElement>
          </Accordion>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>