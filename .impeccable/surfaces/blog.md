# Personal blog redesign
Mode: Read. The user delegated implementation and explicitly rejected the large landing-page hero, ornamental portrait, slogans, blue dark theme, visible loading sentence, draggable portrait and scrollbar shifts.

## Direction contract
THESIS: A personal software blog whose writing leads. A compact author masthead gives context without delaying the index.
OWN-WORLD: Burgundy on warm off-white; muted rose on warm charcoal in dark mode, with a deep burgundy featured surface. Bricolage Grotesque headings, Source Sans 3 reading text, date columns and thin rules.
STORY: Identify the author, scan published posts, filter the archive and read.
FIRST VIEWPORT: Following the user’s request for more character, a stronger name treatment and a 160px squircle portrait opposite the factual introduction. A separate outlined squircle supplies a small motion accent; the photograph itself remains still. Mobile uses an 88px portrait beside the name. A simple More about me link adds useful navigation. Latest posts and the first article remain in the first desktop viewport. No slogan or marketing CTA.
FORM: Open article rows, one emphasized latest post, narrow reading column. Mobile keeps the compact introduction and collapses date columns naturally. Historical exploration seed `705eb6e8` informed the earlier hero; that hero composition was explicitly superseded by the user’s compact-masthead direction. Native squircles now shape the square author portrait, brand mark, and featured entry where supported, with rounded fallbacks.
SIGNATURE: Article titles, dates, summaries, and backing surfaces share native view transitions into the reading header. Motion supports navigation, with reduced-motion support. Native scroll progress is a decorative progressive enhancement.
COPY: Plain headings and actions: Latest posts, Writing, About, Contact, All posts, Read post. Preserve the author's CMS content.
BEHAVIOR: Non-draggable portraits, stable scrollbar gutter, component-scoped accessible placeholders, cached Contact content without a skeleton, familiar keyboard and native dialog controls.
FINISH: Review desktop/mobile in both themes, confirm contrast and navigation, then record the actual design tokens and asset provenance.
