# Shared Resource Navigation

8 September 2026. NAV-05 / WEB-08–10: both sidebars now derive six resource destinations from resourceDestinations.ts. Workspace resource selection opens the existing Home guidance panel after the existing dirty-state check. Legacy Getting Started, Framework Documentation, Glossary, FAQs and Contact / Support requests map to appropriate existing guidance, not generic placeholders. Glossary maps to Learn, not a newly implemented glossary.

Workspace application order/descriptions now use homeApplications.ts, matching the Home cards. Removed obsolete clause badges and unsupported AI descriptions from that menu. Home Workspace labels use consistent capitalisation. Mobile navigation closes below 900px in the central destination handler.

Typecheck, existing tests and all builds passed. Browser suite attempted but blocked by missing Chromium; complete manual responsive/focus/cancellation checks remain outstanding. This is shared resource/app metadata, not completion of the full navigation registry, deep-link routing or account/configuration pages. Contract & Service Model remains a placeholder. No source documents published, domain workflows or HTML teasers changed.

## Follow-up browser checks

8 September 2026: manually checked at 485px. Risk & Compliance shows FERN / Workspace links above the current title with sidebar closed. Workspace link opens seven-section index. Resources & Help → Help & Guidance opens the correct panel and closes the mobile menu. FERN branding returns Home and closes the panel. DOM width equalled viewport width for the checked index/help views. These checks do not cover all breakpoints or unsaved-work cancellation.

Found closed Workspace sidebar controls remained in the accessibility tree. Added inert while closed, matching the Home sidebar's existing treatment. Typecheck, existing tests and builds passed. Rebuilt inert change still needs independent keyboard verification. Full mobile overlay behaviour and focus management remain incomplete acceptance items, not certified by these checks.

## Workspace mobile drawer

Implemented responsive overlay below 900px, backdrop and Close menu action, background inertness, dialog semantics, Escape closure and Tab cycling. Desktop retains its reflowing sidebar. Removed redundant menu-close callbacks that bypassed cancellation state. Close restores focus to the menu toggle.

At 485px manually verified overlay screenshot, background inertness and Close returning focus to Show navigation. Initial focus was still on body during the first check; moved the focus call to the next animation frame after rendering. Final focus timing, Tab cycling and Escape still need independent verification. Typecheck, existing tests and all builds passed after the fix. Automated browser suite remains blocked by missing Chromium. No claim of complete accessibility acceptance.

## Initial-focus verification

8 September 2026: checked the rebuilt preview at http://127.0.0.1:4191/ in a 319px-wide browser viewport. Opening the Workspace menu from Risk & Compliance placed document.activeElement on the Close menu button, confirming the animation-frame focus correction. This is a focused manual check; Tab/Shift+Tab cycling and Escape remain unverified. No application logic or teaser exports changed in this check.
