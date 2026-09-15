# Interface foundation

The first interface pass adds a compact case-first workspace, Google-session entry screen,
search, a separate settings entry, responsive cards and light/dark/system appearance.
The simulation engine and server authorization model are unchanged.

## UI modules

- DesignTokens.html: typography resource dictionary, semantic colors and surface tokens.
- ThemePalette.html: compatibility palette for existing simulator components.
- Fonts.html: embedded DejaVu Sans Latin subset in WOFF format; no external font requests.
- ShellStyles.html: access screen, navigation, case cards and responsive interaction states.
- Styles.html: existing editor, equipment, charts and simulation components.
- UiPreferences.html: theme/system observation and browser preference storage.
- CaseGallery.html: case-card rendering and filtered empty states.
- Client.html: case and simulation application controller.

Change --text-14 for default body text; headings, labels and metadata have their own
tokens in DesignTokens.html. Color changes for both themes belong there. Compatibility
colors for older simulator components remain in ThemePalette.html.
The font license is in FONT-LICENSE.txt. Unsupported glyphs use the system fallback.

## Authentication and remembered entry

The entry button calls getBootstrap, which invokes the existing server identity and
allowlist checks. It does not implement OAuth or collect passwords. Google may require
sign-in/authorization before serving the app, depending on deployment settings.
Keep me signed in remembers only a browser preference to attempt bootstrap automatically.
It never extends a Google session or bypasses server validation. Storage denial falls
back to manual entry. Lock workspace clears that preference and hides the UI; it does
not sign out of Google. Avoid the remembered entry option on shared devices.

## Deployment

Run node scripts/build-manual-apps-script-bundle.mjs, then copy ONLY Code.gs and
Index.html into the manual Apps Script deployment, with the required manifest.
Do not combine generated Code.gs with the modular .gs files: they contain duplicate
functions. The HTML modules are resolved into Index.html by the build.
An alternative modular deployment includes the source modules, excludes Code.gs and
Index.html, and uses WebApp.html as its entry. Publishing on GitHub does not update
the live Google Apps Script deployment.

Run node --test for the existing engine, contract and bundle checks.
