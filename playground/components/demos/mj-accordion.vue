<template>
  <Mjml lang="en">
    <Head>
      <Attributes>
        <Accordion border="none" padding="1px" />
        <AccordionElement
          icon-height="24px"
          icon-unwrapped-url="https://static.mailjet.com/mjml-website/documentation/accordion-arrow-up.png"
          icon-width="24px"
          icon-wrapped-url="https://static.mailjet.com/mjml-website/documentation/accordion-arrow-down.png"
        />
        <AccordionTitle
          background-color="#fff"
          color="#031017"
          font-family="Roboto, Open Sans, Helvetica, Arial, sans-serif"
          font-size="18px"
          padding="15px"
        />
        <AccordionText
          background-color="#fafafa"
          color="#505050"
          font-family="Open Sans, Helvetica, Arial, sans-serif"
          font-size="14px"
          padding="15px"
        />
      </Attributes>
    </Head>

    <Body>
      <Section background-color="#ffffff" padding="20px">
        <Column background-color="#dededd">
          <Accordion>
            <AccordionElement>
              <AccordionTitle>Why use an accordion?</AccordionTitle>
              <AccordionText>
                <span style="line-height:20px;">
                  Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way.
                </span>
              </AccordionText>
            </AccordionElement>
            <AccordionElement>
              <AccordionTitle>How it works</AccordionTitle>
              <AccordionText>
                <span style="line-height:20px;">
                  Content is stacked into tabs and users can expand them at will. If responsive styles are not supported (mostly on desktop clients), tabs are then expanded and your content is readable at once.
                </span>
              </AccordionText>
            </AccordionElement>
          </Accordion>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>