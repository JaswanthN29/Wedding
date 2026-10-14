# Apple-Inspired Website Design System

## Reusable instructions for AI website builders

> **Purpose:** Use this file as a project-wide design brief for creating
> polished, clear, premium websites inspired by the principles behind
> Apple's Human Interface Guidelines (HIG) and product marketing pages.
>
> **Important:** Create an original design informed by these principles.
> Do not imply that Apple designed, endorsed, or operates the website.
> Do not copy Apple's exact page layouts, proprietary assets, logos,
> product photography, or distinctive campaign artwork. The goal is
> comparable quality and restraint---not impersonation.

------------------------------------------------------------------------

## 1. The design mission

Design a website that feels **calm, premium, precise, human, and
effortless**. Every visual and interaction choice should make the
product easier to understand and use.

Prioritize, in this order:

1.  **Clarity:** People should understand what the page is about and
    what they can do next.
2.  **Content first:** Layout and decoration must support the content,
    not compete with it.
3.  **Deference:** The interface should make the product, story, or
    content the hero.
4.  **Consistency:** Reuse a coherent system of spacing, typography,
    colors, components, and interaction patterns.
5.  **Direct manipulation:** Controls should behave in ways people can
    predict from their appearance.
6.  **Feedback:** Important actions need clear, timely responses.
7.  **Accessibility:** The experience must work for people using
    different abilities, input methods, and screen sizes.
8.  **Restraint:** Remove anything that does not improve comprehension,
    trust, or task completion.
9.  **Craft:** Alignment, copy, responsive behavior, loading states, and
    small details matter.
10. **Originality:** Use these principles to create a distinctive
    identity for this specific product.

Do not optimize for "looking Apple-like" at the expense of usability,
accessibility, performance, or the brand's own identity.

## 2. Start with the product, not decoration

Before designing, identify:

-   Who the primary audience is.
-   The main problem the website solves.
-   The single most important action a visitor should take.
-   The information visitors need before taking that action.
-   The product's personality and appropriate level of formality.
-   The content, assets, technical constraints, and brand rules already
    available.

If details are missing, make sensible assumptions and state them
briefly. Do not block progress with unnecessary questions.

Build a clear information hierarchy. Each page should have one dominant
purpose and a visible next step. Avoid adding sections merely to make a
page longer.

## 2A. Mandatory mobile compatibility rule

**Every website and every page must be fully usable on mobile screens. Mobile compatibility is a release requirement, not an optional enhancement or a later phase.** Apply this rule to all new work, redesigns, components, dialogs, navigation, forms, tables, charts, and interactive features.

- Use a mobile-first approach: start with the smallest practical viewport, then enhance the layout for larger screens.
- Support narrow screens from `320px` wide upward without horizontal page scrolling, clipped content, overlapping elements, or unreadable text.
- Use responsive CSS, fluid sizing, flexible layouts, and content-driven breakpoints instead of fixed desktop dimensions.
- Reflow multi-column sections, navigation, media, and controls when space is limited. Do not simply scale the desktop page down.
- Keep buttons, links, menus, and form controls easy to tap; aim for touch targets around `44 × 44 CSS px` where practical. Provide adequate spacing between adjacent targets.
- Ensure mobile menus, dropdowns, dialogs, carousels, tables, and forms work with touch and keyboard input. Never rely on hover as the only way to access functionality.
- Prevent text and images from overflowing their containers. Use responsive images and avoid fixed heights that cut off content when text wraps.
- Keep important content and primary actions available without requiring awkward horizontal scrolling or precision gestures. For genuinely wide data tables, provide an intentional accessible alternative or clearly contained horizontal scrolling.
- Test portrait and landscape layouts, browser zoom, and at least one real or emulated small-screen viewport.
- Do not declare a page complete until the mobile layout has been inspected and its primary user flows tested. If browser preview tooling is available, check the rendered page—not just the source code.

## 3. Visual direction

Aim for a modern editorial/product-marketing aesthetic:

-   Generous negative space, balanced composition, and strong alignment.
-   Large, confident headlines paired with concise supporting copy.
-   High-quality product imagery, purposeful illustrations, or carefully
    composed media.
-   Simple geometric layouts with a small number of meaningful visual
    elements.
-   Subtle borders and dividers instead of excessive cards and shadows.
-   Restrained use of gradients, blur, glass effects, and decorative
    animation.
-   Clear contrast between primary content and secondary information.
-   Consistent corner radii and a deliberate spacing scale.

Avoid:

-   Generic startup templates with identical gradient hero sections.
-   Excessive rounded cards, floating blobs, glow effects, and shadows.
-   Overuse of glassmorphism or translucent panels.
-   Tiny, low-contrast text and overly narrow content columns.
-   Huge headlines that wrap awkwardly or push essential information
    below the fold.
-   Random icon styles, inconsistent radii, and arbitrary spacing.
-   Autoplaying sound, intrusive pop-ups, fake urgency, or distracting
    motion.
-   Fake testimonials, invented statistics, or unsupported product
    claims.

## 4. Layout and spacing

Use a consistent grid and spacing scale. Start with a base spacing unit
of **4 px** and use a limited set of values such as:

`4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120 px`

These are defaults, not laws. Adjust based on content and viewport.

Recommended layout behavior:

-   Use a centered content container with a comfortable maximum width,
    typically around `1120–1280px` for desktop marketing pages.
-   Use fluid side padding, for example `clamp(20px, 5vw, 72px)`.
-   Keep paragraphs at a readable measure, often around `60–75`
    characters per line.
-   Use generous vertical spacing between major sections and tighter
    spacing within related groups.
-   Align headlines, copy, media, and calls to action intentionally.
-   Use asymmetry only when it improves the story or visual balance.
-   Do not force every section into the same layout; alternate layouts
    when the content calls for it.
-   Avoid horizontal overflow at every viewport size.

Create a small number of reusable layout primitives rather than styling
each section independently.

## 5. Typography

Typography should feel precise, readable, and confident.

-   Prefer the platform system font stack unless the project has a
    strong reason to use a licensed brand typeface.
-   Use a clear hierarchy for display headlines, section headings, body
    copy, labels, metadata, and captions.
-   Use fluid sizing with `clamp()` for large responsive headings.
-   Use weight and size to establish hierarchy before adding color.
-   Keep body copy comfortable to read; `16–18px` is a useful starting
    range.
-   Use line-height around `1.1–1.2` for large display headings and
    `1.45–1.7` for body text, adjusting to the typeface.
-   Avoid long passages in all caps, excessive letter spacing, and too
    many font weights.
-   Keep heading line breaks intentional where possible, but never cause
    overflow on narrow screens.
-   Do not use text as an image when real text is possible.

Suggested starting scale (adapt to the project):

  ---------------------------------------------------------------------------
  Role                           Desktop starting point Notes
  --------------------- ------------------------------- ---------------------
  Display                 `clamp(2.75rem, 6vw, 5.5rem)` Short, high-impact
                                                        statement

  H1                       `clamp(2.5rem, 5vw, 4.5rem)` One clear page title

  H2                      `clamp(2rem, 3.5vw, 3.25rem)` Major section heading

  H3                                         `1.5–2rem` Subsection heading

  Body lead                                `1.2–1.4rem` Supporting hero or
                                                        intro copy

  Body                                     `1–1.125rem` Main reading text

  Small                                 `0.875–0.95rem` Metadata; use
                                                        sparingly
  ---------------------------------------------------------------------------

Do not blindly apply every size. Establish a compact hierarchy that fits
the content.

## 6. Color system

Use a small, semantic palette. Begin with neutral surfaces and text,
then introduce the brand accent with intention.

Define tokens for:

-   Page background
-   Primary and secondary surfaces
-   Primary text
-   Secondary text
-   Subtle borders and separators
-   Brand accent
-   Accent hover/pressed states
-   Success, warning, and error states
-   Focus indicator

A neutral starting point might use off-white or white surfaces,
near-black primary text, muted gray secondary text, and one brand
accent. This is a starting direction, not a requirement to reproduce
Apple's exact colors.

Rules:

-   Meet WCAG 2.2 AA contrast targets where applicable: generally
    `4.5:1` for normal text and `3:1` for large text and essential UI
    graphics.
-   Never communicate meaning through color alone.
-   Test colors in both light and dark themes if both are supported.
-   Keep gradients rare and purposeful.
-   Use semantic tokens instead of scattering raw color values through
    components.
-   Do not make secondary text so faint that it becomes difficult to
    read.

## 7. Imagery and media

Media should communicate a real product benefit, create emotional
context, or clarify a concept.

-   Prefer original photography, genuine product screenshots, and custom
    illustrations that fit the brand.
-   Use high-resolution assets with deliberate cropping and consistent
    art direction.
-   Give images room to breathe; avoid unnecessary frames and decorative
    containers.
-   Use `object-fit` and `object-position` intentionally.
-   Provide descriptive alt text for informative images and empty alt
    text for purely decorative images.
-   Reserve layout space to prevent content shifts while images load.
-   Use responsive image sizes and modern formats when supported.
-   Provide posters or reduced-motion alternatives for video where
    appropriate.
-   Do not use Apple's logo, product imagery, screenshots, or campaign
    artwork in a way that implies official affiliation.
-   Never invent product capabilities through misleading imagery.

## 8. Navigation and information architecture

Navigation should be simple, predictable, and easy to scan.

-   Use concise labels based on users' language, not internal company
    jargon.
-   Keep top-level navigation focused on the most important
    destinations.
-   Make the current location clear when useful.
-   Make the primary action visually distinct without making every
    navigation item look like a button.
-   On mobile, provide an accessible menu with clear open/close states
    and keyboard support.
-   Ensure menus work with touch, keyboard, and assistive technology.
-   Avoid hiding essential content behind hover-only interactions.
-   Use breadcrumbs for deep hierarchies where they help orientation.
-   Keep the logo linked to the homepage when that convention fits the
    site.

## 9. Hero sections and product storytelling

A strong hero usually includes:

1.  A concise headline describing the outcome or core value.
2.  A supporting sentence or two with useful context.
3.  One primary call to action.
4.  An optional secondary action when it serves a genuinely different
    intent.
5.  A strong visual that supports the message.

The hero should answer quickly: **What is this? Why should I care? What
can I do next?**

Use short, concrete copy. Avoid vague claims such as "revolutionary,"
"best-in-class," or "the future" unless they are substantiated. Do not
use multiple competing headlines or too many calls to action.

Below the hero, tell a deliberate story: benefit, evidence, how it
works, details, trust signals, and the next step. Not every site needs
every section.

## 10. Components and interaction patterns

Build a consistent, reusable component system. Common components may
include:

-   Header and navigation
-   Hero
-   Primary and secondary buttons
-   Text links
-   Feature/story sections
-   Product gallery or media viewer
-   Comparison table
-   Testimonial or proof section, only when genuine
-   Form fields and validation messages
-   Accordion, tabs, or disclosure controls where they improve scanning
-   Footer
-   Toast, dialog, or confirmation patterns when needed

For every component, define its purpose, anatomy, variants, states,
responsive behavior, and accessibility requirements.

### Buttons and links

-   Make links look and behave like links; make buttons perform actions.
-   Use clear, verb-led labels such as "Get started," "Compare plans,"
    or "Download guide."
-   Establish primary, secondary, and tertiary styles.
-   Provide visible hover, focus, active, disabled, and loading states
    where relevant.
-   Make interactive targets comfortably large. Aim for at least
    `44 × 44 CSS px` where practical, and meet WCAG target-size
    requirements.
-   Do not rely on hover alone to communicate that an element is
    interactive.
-   Avoid vague labels like "Click here" when a more descriptive label
    is possible.

### Forms

-   Give every field a persistent, programmatically associated label.
-   Use the correct input type and autocomplete hints.
-   Explain required fields and constraints before or near submission.
-   Validate accessibly and explain how to fix errors in plain language.
-   Preserve entered data when an error occurs.
-   Show a clear success state after successful submission.
-   Do not use placeholder text as the only label.

### Feedback and state

Every meaningful interaction should have a predictable result. Account
for:

-   Default
-   Hover
-   Keyboard focus
-   Pressed/active
-   Disabled
-   Loading
-   Success
-   Error
-   Empty
-   Offline or unavailable, where relevant

Use animation to explain state changes, not to decorate every action.
Never show a success message before the action has actually succeeded.

## 11. Motion and transitions

Motion should be subtle, purposeful, and respectful.

-   Use short transitions for hover, focus, disclosure, and state
    changes.
-   Use larger transitions only when they help users understand spatial
    or narrative relationships.
-   Prefer opacity and transforms over animating layout-heavy
    properties.
-   Avoid scroll-jacking, excessive parallax, looping decorative motion,
    and forced cinematic sequences.
-   Keep essential content available without animation.
-   Respect `prefers-reduced-motion: reduce` and provide a
    reduced-motion experience.
-   Ensure motion does not delay a user's task or create discomfort.
-   Do not animate every element into view merely because an animation
    library is available.

A practical starting range is around `150–250ms` for simple UI
transitions, adjusted to context. Duration is a design choice, not a
universal rule.

## 12. Responsive design

Design for the content and interaction---not just named device
breakpoints.

Test at minimum:

-   Small phone: approximately `320–375px`
-   Typical phone: approximately `390–430px`
-   Tablet: approximately `768–1024px`
-   Laptop: approximately `1280–1440px`
-   Large desktop: `1600px` and above

Requirements:

-   Use fluid typography and spacing where appropriate.
-   Reflow layouts rather than shrinking desktop layouts mechanically.
-   Keep essential content and actions available on mobile.
-   Ensure navigation, dialogs, tables, forms, and media work with
    touch.
-   Avoid fixed heights around text or content that may wrap.
-   Prevent clipped headings, overlapping controls, and horizontal
    scrolling.
-   Test landscape orientation and browser zoom.
-   Use responsive image sources when appropriate.
-   Do not assume every mobile experience must be a single-column
    version of desktop; choose the best hierarchy for the context.

## 13. Accessibility is part of the design

Use WCAG 2.2 AA as the baseline target.

-   Use semantic HTML landmarks and a logical heading order.
-   Ensure all functionality is keyboard accessible.
-   Keep focus visible and in a logical order.
-   Do not trap keyboard focus except inside modal interactions where
    expected; restore focus when a dialog closes.
-   Provide accessible names for icon-only controls.
-   Use native HTML elements before custom widgets.
-   Support screen readers and text resizing.
-   Maintain sufficient color contrast.
-   Do not convey status using color alone.
-   Add captions or transcripts for meaningful audio/video.
-   Respect reduced-motion preferences.
-   Ensure validation errors are announced and associated with the
    relevant fields.
-   Avoid keyboard traps, flashing content, and time limits unless
    essential.
-   Test with keyboard navigation and at least one screen reader when
    feasible.

Accessibility is not a final polish pass. Include it from the first
component.

## 14. Content and writing style

Write in a clear, human, confident voice.

-   Lead with user outcomes rather than internal features.
-   Prefer short sentences and concrete words.
-   Remove filler, repeated claims, and unnecessary adjectives.
-   Use consistent capitalization and punctuation.
-   Explain technical terms when the audience may not know them.
-   Make calls to action specific and honest.
-   Use real evidence and genuine testimonials only.
-   Never fabricate customer logos, awards, security claims, usage
    numbers, or certifications.
-   Do not use "Apple," "official," or similar wording to imply a
    relationship that does not exist.

A good page feels simple because the content has been carefully
edited---not because useful information has been removed.

## 15. Performance and implementation quality

The website should feel fast and stable.

-   Prefer semantic HTML, modern CSS, and simple, maintainable
    components.
-   Avoid adding a library for a small effect that can be achieved
    simply.
-   Optimize image dimensions, formats, and loading behavior.
-   Lazy-load below-the-fold media where appropriate; do not lazy-load
    the primary hero image if it harms the initial view.
-   Avoid unnecessary client-side JavaScript.
-   Prevent layout shifts by reserving space for media and dynamic
    content.
-   Use font loading strategies that minimize flashes and layout shifts.
-   Provide useful loading, empty, error, and offline states where
    relevant.
-   Ensure controls are functional, not merely visual mockups.
-   Use progressive enhancement where feasible.
-   Keep console errors, broken links, and failed network requests out
    of the final experience.
-   Protect user input and sensitive data; do not expose secrets in
    client code.

When applicable, check Core Web Vitals and aim for good real-user
performance, rather than optimizing only for a synthetic screenshot.

## 16. Dark mode

If the project supports dark mode:

-   Treat it as a designed theme, not a simple inversion.
-   Define semantic color tokens for both themes.
-   Check text contrast, borders, shadows, media, forms, and focus
    indicators separately.
-   Avoid pure black and pure white everywhere if they create harsh
    contrast; choose values that suit the product.
-   Respect the user's system preference unless the product has a reason
    to provide a manual choice.
-   Keep theme switching consistent and accessible.
-   Prevent a distracting flash of the wrong theme on load where
    practical.

Do not add dark mode automatically if it complicates the product without
meaningful benefit.

## 17. Trust, privacy, and honesty

-   Explain what happens when a user submits information.
-   Ask only for information needed for the task.
-   Make consent choices understandable and unambiguous.
-   Do not disguise advertising as content or make deceptive controls.
-   Do not create fake urgency, fake availability, or fabricated social
    proof.
-   Make pricing, limitations, and important terms easy to find.
-   Use secure transport and safe handling of user data.
-   Never hard-code API keys or private credentials into frontend code.

## 18. Technical implementation instructions for coding agents

Before changing code:

1.  Inspect the existing project structure, framework, dependencies,
    design tokens, and current conventions.
2.  Reuse the established stack and patterns unless there is a strong
    reason to change them.
3.  Identify the pages and components that need to be created or
    modified.
4.  Preserve existing working functionality.
5.  Do not replace a functioning application with a static mockup.

While implementing:

-   Create reusable components and semantic design tokens.
-   Keep styles consistent and avoid unnecessary one-off overrides.
-   Use the project's existing package manager and conventions.
-   Avoid introducing dependencies without a clear benefit.
-   Use real supplied content and assets where available.
-   If assets are missing, create or source suitable original assets; do
    not silently use unrelated stock imagery.
-   Keep business logic separate from presentational details where
    practical.
-   Include meaningful empty, loading, success, and error states for
    real interactions.
-   Use semantic HTML and accessible controls.
-   Do not claim that a form, payment, login, API, or navigation works
    unless it is implemented.

After implementation:

1.  Run the available lint, type-check, test, and build commands.
2.  Fix issues introduced by the changes.
3.  Inspect every relevant page at mobile, tablet, and desktop sizes.
4.  Test keyboard focus and the primary user flows.
5.  Check for overflow, layout shifts, broken images, console errors,
    and dead links.
6.  Summarize what changed, what was tested, and any known limitations.

If browser preview or screenshot tooling is available, inspect the
actual rendered result and iterate. Do not judge quality from source
code alone.

## 19. A practical design-token starter

Use these as initial values, then adapt them to the product. Do not
scatter these raw values through the code; centralize them in CSS
variables or the framework's theme system.

``` css
:root {
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --text-primary: #1d1d1f;
  --text-secondary: #6e6e73;

  /* Surfaces and borders */
  --surface-page: #ffffff;
  --surface-subtle: #f5f5f7;
  --border-subtle: rgba(0, 0, 0, 0.12);

  /* Brand: replace with the project's own brand accent */
  --color-accent: #0066cc;
  --color-accent-hover: #0055aa;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* Shape and layout */
  --radius-control: 999px;
  --radius-card: 18px;
  --content-max: 1200px;
  --page-gutter: clamp(20px, 5vw, 72px);

  /* Motion */
  --duration-fast: 150ms;
  --duration-standard: 220ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

These values are a starter kit, not a mandate. Confirm actual contrast,
component states, brand fit, and theme behavior before shipping.

## 20. Reusable prompt to give the coding agent

Use this prompt alongside the current project's requirements:

> Read and follow `APPLE_INSPIRED_DESIGN_SYSTEM.md` as the visual,
> interaction, accessibility, and implementation baseline for this
> project. First inspect the existing codebase and preserve its
> framework and working functionality. Apply the principles in context
> rather than copying a reference website. Build an original, premium,
> clear, content-first interface with strong typography, intentional
> spacing, restrained color, accessible interactions, and polished
> states. **Every page must be fully responsive and usable on mobile;
> mobile support is mandatory, not optional.** Use a mobile-first
> approach, prevent horizontal overflow at widths down to `320px`, and
> adapt navigation, content, media, forms, and controls for touch
> screens. Use reusable components and semantic design tokens. Make
> every visible control functional or clearly identify it as a
> placeholder. Do not imitate Apple's exact pages, proprietary assets,
> logo, or brand identity, and do not imply Apple affiliation. Test the
> rendered result at mobile (including `320px`), tablet, and desktop
> sizes; run the available checks; fix issues; and report what was
> implemented and tested.

## 21. Final quality checklist

Before calling the website complete, verify:

### Design

-   [ ] The page's purpose and primary action are immediately clear.
-   [ ] The visual hierarchy is obvious without excessive decoration.
-   [ ] Typography, spacing, radii, colors, and alignment are
    consistent.
-   [ ] Media is high quality, relevant, and correctly cropped.
-   [ ] The site feels designed for its own product, not like a copied
    template.

### Usability

-   [ ] Navigation labels are clear.
-   [ ] Calls to action are specific and work.
-   [ ] Forms have labels, helpful validation, and clear outcomes.
-   [ ] Loading, empty, error, disabled, and success states are
    considered.
-   [ ] No essential functionality depends on hover.

### Accessibility

-   [ ] Keyboard navigation works and focus is visible.
-   [ ] Contrast is sufficient.
-   [ ] Semantic structure and accessible names are present.
-   [ ] Reduced-motion preferences are respected.
-   [ ] Text zoom and screen-reader use are considered.

### Responsive quality

-   [ ] Mobile compatibility is implemented for every page and component.
-   [ ] The site works at widths down to `320px` with no unintended horizontal overflow.
-   [ ] Headings, text, images, and controls do not overlap or clip.
-   [ ] Navigation and primary flows work with touch input.
-   [ ] Layouts adapt intentionally across breakpoints and orientation changes.
-   [ ] Images and video scale appropriately.

### Engineering

-   [ ] No broken links, missing assets, or avoidable console errors.
-   [ ] No unnecessary dependencies or excessive client-side code.
-   [ ] Build, lint, and tests pass where available.
-   [ ] Real functionality is implemented; no fake interactions are
    presented as complete.
-   [ ] Performance and layout stability have been considered.

### Trust and originality

-   [ ] Claims, metrics, testimonials, and credentials are genuine.
-   [ ] User data is handled responsibly.
-   [ ] Apple's identity and assets are not copied or used to imply
    endorsement.
-   [ ] The result applies Apple's broad design principles while
    maintaining an original brand identity.

------------------------------------------------------------------------

**Core rule:** Make the experience feel effortless by being deliberate
about every decision. Clarity first, content first, accessibility
always, and no visual effect without a purpose.
