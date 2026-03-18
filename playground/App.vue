<template>
	<main class="shell">
		<section class="panel catalog-section">
			<div class="section-copy">
				<p class="panel-label">Playground</p>
				<h1>Welcome to the VJML playground</h1>
				<p class="section-description">
					This page keeps the setup intentionally small. The preview below is rendered entirely through the plugin, and it mixes bare tags like <code>&lt;Mjml&gt;</code> with prefixed aliases like <code>&lt;VJText&gt;</code> and <code>&lt;VJButton&gt;</code>.
				</p>
			</div>

			<div class="example-preview">
				<Mjml lang="en">
					<Body width="340px" background-color="#f6efe7">
						<Section background-color="#fffaf2" padding="24px">
							<Column>
								<Text color="#db7636" font-size="12px" font-weight="700" letter-spacing="0.18em" text-transform="uppercase">
									Plugin check
								</Text>

								<Spacer height="10px" />

								<VJText color="#173540" font-size="22px" font-weight="700" line-height="28px">
									Welcome to the preview workspace
								</VJText>

								<Spacer height="10px" />

								<Text color="#425d64" font-size="14px" line-height="22px">
									The plugin is configured to register both unprefixed and <code>VJ</code>-prefixed component aliases, so the playground can verify both paths in one place.
								</Text>

								<Spacer height="16px" />

								<VJButton
									align="left"
									background-color="#16353f"
									border-radius="999px"
									color="#fffaf2"
									href="https://example.com/docs"
									inner-padding="10px 16px"
								>
									Open documentation
								</VJButton>
							</Column>
						</Section>
					</Body>
				</Mjml>
			</div>
		</section>
	</main>
</template>

