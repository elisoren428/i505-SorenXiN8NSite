# **App Name**: SorenXi N8N Directory

## Core Features:

- GitHub Workflow Fetcher: Fetch n8n workflow JSON files from a public GitHub repository using the provided GitHub token: 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.
- Workflow Card Display: Display workflows as stylized cards in a paginated interface, including workflow name, a short description extracted from metadata or filename, and buttons: “Open,” “Edit,” and “Duplicate.”
- Workflow Pagination: Paginate workflows, displaying a maximum of 6 cards per page on small screens and 4 on large screens, rendered in a responsive grid layout.
- Workflow detail page linking: Make each card in the list 'Open', to link directly to that N8N page to display in greater detail, including steps to use in N8N and required parameters.
- AI Assisted Workflow Enhancement: Implement a tool that uses a generative AI model to suggest workflow improvements based on the content of a selected workflow JSON. Allow a user to 'fix' one or more steps automatically.
- Impressive Landing Page: An impressive landing page to showcase the N8N workflows.

## Style Guidelines:

- Charcoal black base (#222222) with soft, radial glowing gradients in orange and purple hues.
- Electric blue (#7DF9FF), deep purple (#9400D3), midnight teal (#008080).
- White (#FFFFFF) for primary text, soft blue glow (#ADD8E6) for highlights, and muted neon orange (#FF8C00) for CTAs.
- Large faded uppercase letters (like "MOST") for texture, using white (#FFFFFF) at 10% opacity.
- 'Bebas Neue', a wide sans-serif, bold.
- 'Inter' sans-serif, light, modern, readable on dark backgrounds.
- Styled with a blue-to-deep-purple gradient background, light blur/glassmorphism effect, medium border radius. Should appear to float visually, not sit flat.
- Implement a hover effect, such as a glow or soft zoom, to enhance interactivity.