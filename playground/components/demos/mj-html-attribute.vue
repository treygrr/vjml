<template>
  <Mjml lang="en">
    <Head>
      <HtmlAttributes>
        <Selector path=".attr-target">
          <HtmlAttribute name="style">
            color:#db7636;font-weight:700;
          </HtmlAttribute>
        </Selector>
      </HtmlAttributes>
    </Head>

    <Body width="340px" background-color="#f7efe4">
      <Section background-color="#fffdf8" padding="22px">
        <Column>
          <Text color="#173540" font-size="18px" font-weight="700" line-height="24px">
            Concrete HTML attribute values
          </Text>

          <Spacer height="8px" />

          <Text color="#425d64" font-size="14px" line-height="22px">
            HtmlAttribute writes the final attribute value onto nodes selected by HtmlAttributes and Selector.
          </Text>

          <Spacer height="8px" />

          <Text css-class="attr-target">
            Selector target in the rendered HTML.
          </Text>
        </Column>
      </Section>
    </Body>
  </Mjml>
</template>