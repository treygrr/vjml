/* eslint-disable */

export type VjmlAttributePrimitive = string | number | boolean
export type VjmlContentValue = string | number | boolean
export type VjmlBooleanValue = boolean | 'true' | 'false' | ''
export type VjmlTokenBooleanValue<Token extends string> = VjmlBooleanValue | Token
export type VjmlClassValue =
  | string
  | readonly string[]
  | Readonly<Record<string, boolean>>
  | null
  | undefined
export type VjmlUnitValue = string | number
export type VjmlIntegerValue = number | `${number}`
export type VjmlArbitraryAttributeValue =
  | VjmlAttributePrimitive
  | VjmlClassValue
  | undefined

export interface VjmlCommonComponentProps {
  class?: VjmlClassValue
  className?: VjmlClassValue
  cssClass?: VjmlClassValue
  mjClass?: VjmlClassValue
}

export interface VjmlNestedChildrenProps {
  content?: never
  html?: never
  text?: never
}

export interface VjmlLeafContentProps {
  content?: never
  html?: never
  text?: never
}

export interface VjmlHtmlContentProps {
  content?: VjmlContentValue
  html?: VjmlContentValue
  text?: never
}

export interface VjmlTextContentProps {
  content?: VjmlContentValue
  html?: never
  text?: VjmlContentValue
}

export type VjmlSocialElementName =
  | "facebook"
  | "facebook-noshare"
  | "twitter"
  | "twitter-noshare"
  | "x"
  | "x-noshare"
  | "google"
  | "google-noshare"
  | "pinterest"
  | "pinterest-noshare"
  | "linkedin"
  | "linkedin-noshare"
  | "instagram"
  | "instagram-noshare"
  | "web"
  | "web-noshare"
  | "snapchat"
  | "snapchat-noshare"
  | "youtube"
  | "youtube-noshare"
  | "tumblr"
  | "tumblr-noshare"
  | "github"
  | "github-noshare"
  | "xing"
  | "xing-noshare"
  | "vimeo"
  | "vimeo-noshare"
  | "medium"
  | "medium-noshare"
  | "soundcloud"
  | "soundcloud-noshare"
  | "dribbble"
  | "dribbble-noshare"

export interface VjmlAccordionProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  border?: string
  containerBackgroundColor?: string
  fontFamily?: string
  iconAlign?: "top" | "middle" | "bottom"
  iconHeight?: VjmlUnitValue
  iconPosition?: "left" | "right"
  iconUnwrappedAlt?: string
  iconUnwrappedUrl?: string
  iconWidth?: VjmlUnitValue
  iconWrappedAlt?: string
  iconWrappedUrl?: string
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
}

export interface VjmlAccordionElementProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  backgroundColor?: string
  border?: string
  fontFamily?: string
  iconAlign?: "top" | "middle" | "bottom"
  iconHeight?: VjmlUnitValue
  iconPosition?: "left" | "right"
  iconUnwrappedAlt?: string
  iconUnwrappedUrl?: string
  iconWidth?: VjmlUnitValue
  iconWrappedAlt?: string
  iconWrappedUrl?: string
}

export interface VjmlAccordionTextProps extends VjmlCommonComponentProps, VjmlHtmlContentProps {
  backgroundColor?: string
  color?: string
  fontFamily?: string
  fontSize?: VjmlUnitValue
  fontWeight?: string
  letterSpacing?: VjmlUnitValue
  lineHeight?: VjmlUnitValue
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
}

export interface VjmlAccordionTitleProps extends VjmlCommonComponentProps, VjmlHtmlContentProps {
  backgroundColor?: string
  color?: string
  fontFamily?: string
  fontSize?: VjmlUnitValue
  fontWeight?: string
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
}

export interface VjmlAllProps extends VjmlCommonComponentProps, VjmlLeafContentProps {
  [attributeName: string]: VjmlArbitraryAttributeValue
}

export interface VjmlAttributesProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
}

export interface VjmlBodyProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  backgroundColor?: string
  width?: VjmlUnitValue
}

export interface VjmlBreakpointProps extends VjmlCommonComponentProps, VjmlHtmlContentProps {
  width?: VjmlUnitValue
}

export interface VjmlButtonProps extends VjmlCommonComponentProps, VjmlHtmlContentProps {
  align?: "left" | "center" | "right"
  backgroundColor?: string
  border?: string
  borderBottom?: string
  borderLeft?: string
  borderRadius?: string
  borderRight?: string
  borderTop?: string
  color?: string
  containerBackgroundColor?: string
  fontFamily?: string
  fontSize?: VjmlUnitValue
  fontStyle?: string
  fontWeight?: string
  height?: VjmlUnitValue
  href?: string
  innerPadding?: VjmlUnitValue
  letterSpacing?: VjmlUnitValue
  lineHeight?: VjmlUnitValue
  name?: string
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  rel?: string
  target?: string
  textAlign?: "left" | "right" | "center"
  textDecoration?: string
  textTransform?: string
  title?: string
  verticalAlign?: "top" | "bottom" | "middle"
  width?: VjmlUnitValue
}

export interface VjmlCarouselProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  align?: "left" | "center" | "right"
  borderRadius?: VjmlUnitValue
  containerBackgroundColor?: string
  iconWidth?: VjmlUnitValue
  leftIcon?: string
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  rightIcon?: string
  tbBorder?: string
  tbBorderRadius?: VjmlUnitValue
  tbHoverBorderColor?: string
  tbSelectedBorderColor?: string
  tbWidth?: VjmlUnitValue
  thumbnails?: "visible" | "hidden" | "supported"
}

export interface VjmlCarouselImageProps extends VjmlCommonComponentProps, VjmlHtmlContentProps {
  alt?: string
  borderRadius?: VjmlUnitValue
  href?: string
  rel?: string
  src?: string
  target?: string
  tbBorder?: string
  tbBorderRadius?: VjmlUnitValue
  thumbnailsSrc?: string
  title?: string
}

export interface VjmlClassProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  [attributeName: string]: VjmlArbitraryAttributeValue
  name?: string
}

export interface VjmlColumnProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  backgroundColor?: string
  border?: string
  borderBottom?: string
  borderLeft?: string
  borderRadius?: VjmlUnitValue
  borderRight?: string
  borderTop?: string
  direction?: "ltr" | "rtl"
  innerBackgroundColor?: string
  innerBorder?: string
  innerBorderBottom?: string
  innerBorderLeft?: string
  innerBorderRadius?: VjmlUnitValue
  innerBorderRight?: string
  innerBorderTop?: string
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  verticalAlign?: "top" | "bottom" | "middle"
  width?: VjmlUnitValue
}

export interface VjmlDividerProps extends VjmlCommonComponentProps, VjmlLeafContentProps {
  align?: "left" | "center" | "right"
  borderColor?: string
  borderStyle?: string
  borderWidth?: VjmlUnitValue
  containerBackgroundColor?: string
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  width?: VjmlUnitValue
}

export interface VjmlFontProps extends VjmlCommonComponentProps, VjmlLeafContentProps {
  href?: string
  name?: string
}

export interface VjmlGroupProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  backgroundColor?: string
  direction?: "ltr" | "rtl"
  verticalAlign?: "top" | "bottom" | "middle"
  width?: VjmlUnitValue
}

export interface VjmlHeadProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
}

export interface VjmlHeroProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  backgroundColor?: string
  backgroundHeight?: VjmlUnitValue
  backgroundPosition?: string
  backgroundUrl?: string
  backgroundWidth?: VjmlUnitValue
  borderRadius?: string
  containerBackgroundColor?: string
  height?: VjmlUnitValue
  innerBackgroundColor?: string
  innerPadding?: VjmlUnitValue
  innerPaddingBottom?: VjmlUnitValue
  innerPaddingLeft?: VjmlUnitValue
  innerPaddingRight?: VjmlUnitValue
  innerPaddingTop?: VjmlUnitValue
  mode?: string
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  verticalAlign?: "top" | "bottom" | "middle"
}

export interface VjmlHtmlAttributeProps extends VjmlCommonComponentProps, VjmlTextContentProps {
  name?: string
}

export interface VjmlHtmlAttributesProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
}

export interface VjmlImageProps extends VjmlCommonComponentProps, VjmlLeafContentProps {
  align?: "left" | "center" | "right"
  alt?: string
  border?: string
  borderBottom?: string
  borderLeft?: string
  borderRadius?: VjmlUnitValue
  borderRight?: string
  borderTop?: string
  containerBackgroundColor?: string
  fluidOnMobile?: VjmlBooleanValue
  fontSize?: VjmlUnitValue
  height?: VjmlUnitValue
  href?: string
  maxHeight?: VjmlUnitValue
  name?: string
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  rel?: string
  sizes?: string
  src?: string
  srcset?: string
  target?: string
  title?: string
  usemap?: string
  width?: VjmlUnitValue
}

export interface VjmlMjmlProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  dir?: string
  lang?: string
  owa?: string
}

export interface VjmlNavbarProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  align?: "left" | "center" | "right"
  baseUrl?: string
  hamburger?: string
  icoAlign?: "left" | "center" | "right"
  icoClose?: string
  icoColor?: string
  icoFontFamily?: string
  icoFontSize?: VjmlUnitValue
  icoLineHeight?: VjmlUnitValue
  icoOpen?: string
  icoPadding?: VjmlUnitValue
  icoPaddingBottom?: VjmlUnitValue
  icoPaddingLeft?: VjmlUnitValue
  icoPaddingRight?: VjmlUnitValue
  icoPaddingTop?: VjmlUnitValue
  icoTextDecoration?: string
  icoTextTransform?: string
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
}

export interface VjmlNavbarLinkProps extends VjmlCommonComponentProps, VjmlHtmlContentProps {
  color?: string
  fontFamily?: string
  fontSize?: VjmlUnitValue
  fontStyle?: string
  fontWeight?: string
  href?: string
  letterSpacing?: VjmlUnitValue
  lineHeight?: VjmlUnitValue
  name?: string
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  rel?: string
  target?: string
  textDecoration?: string
  textTransform?: string
}

export interface VjmlPreviewProps extends VjmlCommonComponentProps, VjmlTextContentProps {
}

export interface VjmlRawProps extends VjmlCommonComponentProps, VjmlHtmlContentProps {
  position?: "file-start"
}

export interface VjmlSectionProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  backgroundColor?: string
  backgroundPosition?: string
  backgroundPositionX?: string
  backgroundPositionY?: string
  backgroundRepeat?: "repeat" | "no-repeat"
  backgroundSize?: string
  backgroundUrl?: string
  border?: string
  borderBottom?: string
  borderLeft?: string
  borderRadius?: string
  borderRight?: string
  borderTop?: string
  direction?: "ltr" | "rtl"
  fullWidth?: VjmlTokenBooleanValue<'full-width'>
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  textAlign?: "left" | "center" | "right"
  textPadding?: VjmlUnitValue
}

export interface VjmlSelectorProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  path?: string
}

export interface VjmlSocialProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  align?: "left" | "right" | "center"
  borderRadius?: VjmlUnitValue
  color?: string
  containerBackgroundColor?: string
  fontFamily?: string
  fontSize?: VjmlUnitValue
  fontStyle?: string
  fontWeight?: string
  iconHeight?: VjmlUnitValue
  iconPadding?: VjmlUnitValue
  iconSize?: VjmlUnitValue
  innerPadding?: VjmlUnitValue
  lineHeight?: VjmlUnitValue
  mode?: "horizontal" | "vertical"
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  tableLayout?: "auto" | "fixed"
  textDecoration?: string
  textPadding?: VjmlUnitValue
  verticalAlign?: "top" | "bottom" | "middle"
}

export interface VjmlSocialElementProps extends VjmlCommonComponentProps, VjmlHtmlContentProps {
  align?: "left" | "center" | "right"
  alt?: string
  backgroundColor?: string
  borderRadius?: VjmlUnitValue
  color?: string
  fontFamily?: string
  fontSize?: VjmlUnitValue
  fontStyle?: string
  fontWeight?: string
  href?: string
  iconHeight?: VjmlUnitValue
  iconPadding?: VjmlUnitValue
  iconPosition?: "left" | "right"
  iconSize?: VjmlUnitValue
  lineHeight?: VjmlUnitValue
  name?: VjmlSocialElementName | (string & {})
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  rel?: string
  sizes?: string
  src?: string
  srcset?: string
  target?: string
  textDecoration?: string
  textPadding?: VjmlUnitValue
  title?: string
  verticalAlign?: "top" | "middle" | "bottom"
}

export interface VjmlSpacerProps extends VjmlCommonComponentProps, VjmlLeafContentProps {
  border?: string
  borderBottom?: string
  borderLeft?: string
  borderRight?: string
  borderTop?: string
  containerBackgroundColor?: string
  height?: VjmlUnitValue
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
}

export interface VjmlStyleProps extends VjmlCommonComponentProps, VjmlTextContentProps {
  inline?: VjmlTokenBooleanValue<'inline'>
}

export interface VjmlTableProps extends VjmlCommonComponentProps, VjmlHtmlContentProps {
  align?: "left" | "right" | "center"
  border?: string
  cellpadding?: VjmlIntegerValue
  cellspacing?: VjmlIntegerValue
  color?: string
  containerBackgroundColor?: string
  fontFamily?: string
  fontSize?: VjmlUnitValue
  fontWeight?: string
  lineHeight?: VjmlUnitValue
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  role?: "none" | "presentation"
  tableLayout?: "auto" | "fixed" | "initial" | "inherit"
  verticalAlign?: "top" | "bottom" | "middle"
  width?: VjmlUnitValue
}

export interface VjmlTextProps extends VjmlCommonComponentProps, VjmlHtmlContentProps {
  align?: "left" | "right" | "center" | "justify"
  backgroundColor?: string
  color?: string
  containerBackgroundColor?: string
  fontFamily?: string
  fontSize?: VjmlUnitValue
  fontStyle?: string
  fontWeight?: string
  height?: VjmlUnitValue
  letterSpacing?: VjmlUnitValue
  lineHeight?: VjmlUnitValue
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  textDecoration?: string
  textTransform?: string
  verticalAlign?: "top" | "bottom" | "middle"
}

export interface VjmlTitleProps extends VjmlCommonComponentProps, VjmlTextContentProps {
}

export interface VjmlWrapperProps extends VjmlCommonComponentProps, VjmlNestedChildrenProps {
  backgroundColor?: string
  backgroundPosition?: string
  backgroundPositionX?: string
  backgroundPositionY?: string
  backgroundRepeat?: "repeat" | "no-repeat"
  backgroundSize?: string
  backgroundUrl?: string
  border?: string
  borderBottom?: string
  borderLeft?: string
  borderRadius?: string
  borderRight?: string
  borderTop?: string
  direction?: "ltr" | "rtl"
  fullWidth?: VjmlTokenBooleanValue<'full-width'>
  gap?: VjmlUnitValue
  padding?: VjmlUnitValue
  paddingBottom?: VjmlUnitValue
  paddingLeft?: VjmlUnitValue
  paddingRight?: VjmlUnitValue
  paddingTop?: VjmlUnitValue
  textAlign?: "left" | "center" | "right"
  textPadding?: VjmlUnitValue
}

export interface VjmlComponentPropsByBaseName {
  Accordion: VjmlAccordionProps
  AccordionElement: VjmlAccordionElementProps
  AccordionText: VjmlAccordionTextProps
  AccordionTitle: VjmlAccordionTitleProps
  All: VjmlAllProps
  Attributes: VjmlAttributesProps
  Body: VjmlBodyProps
  Breakpoint: VjmlBreakpointProps
  Button: VjmlButtonProps
  Carousel: VjmlCarouselProps
  CarouselImage: VjmlCarouselImageProps
  Class: VjmlClassProps
  Column: VjmlColumnProps
  Divider: VjmlDividerProps
  Font: VjmlFontProps
  Group: VjmlGroupProps
  Head: VjmlHeadProps
  Hero: VjmlHeroProps
  HtmlAttribute: VjmlHtmlAttributeProps
  HtmlAttributes: VjmlHtmlAttributesProps
  Image: VjmlImageProps
  Mjml: VjmlMjmlProps
  Navbar: VjmlNavbarProps
  NavbarLink: VjmlNavbarLinkProps
  Preview: VjmlPreviewProps
  Raw: VjmlRawProps
  Section: VjmlSectionProps
  Selector: VjmlSelectorProps
  Social: VjmlSocialProps
  SocialElement: VjmlSocialElementProps
  Spacer: VjmlSpacerProps
  Style: VjmlStyleProps
  Table: VjmlTableProps
  Text: VjmlTextProps
  Title: VjmlTitleProps
  Wrapper: VjmlWrapperProps
}

export interface VjmlComponentPropsByTagName {
  "mj-accordion": VjmlAccordionProps
  "mj-accordion-element": VjmlAccordionElementProps
  "mj-accordion-text": VjmlAccordionTextProps
  "mj-accordion-title": VjmlAccordionTitleProps
  "mj-all": VjmlAllProps
  "mj-attributes": VjmlAttributesProps
  "mj-body": VjmlBodyProps
  "mj-breakpoint": VjmlBreakpointProps
  "mj-button": VjmlButtonProps
  "mj-carousel": VjmlCarouselProps
  "mj-carousel-image": VjmlCarouselImageProps
  "mj-class": VjmlClassProps
  "mj-column": VjmlColumnProps
  "mj-divider": VjmlDividerProps
  "mj-font": VjmlFontProps
  "mj-group": VjmlGroupProps
  "mj-head": VjmlHeadProps
  "mj-hero": VjmlHeroProps
  "mj-html-attribute": VjmlHtmlAttributeProps
  "mj-html-attributes": VjmlHtmlAttributesProps
  "mj-image": VjmlImageProps
  "mjml": VjmlMjmlProps
  "mj-navbar": VjmlNavbarProps
  "mj-navbar-link": VjmlNavbarLinkProps
  "mj-preview": VjmlPreviewProps
  "mj-raw": VjmlRawProps
  "mj-section": VjmlSectionProps
  "mj-selector": VjmlSelectorProps
  "mj-social": VjmlSocialProps
  "mj-social-element": VjmlSocialElementProps
  "mj-spacer": VjmlSpacerProps
  "mj-style": VjmlStyleProps
  "mj-table": VjmlTableProps
  "mj-text": VjmlTextProps
  "mj-title": VjmlTitleProps
  "mj-wrapper": VjmlWrapperProps
}

