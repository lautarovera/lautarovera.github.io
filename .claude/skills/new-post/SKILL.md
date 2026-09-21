---
name: new-post
description: Draft a technical blog article from a short interview with the author. Use when the user wants to start a new blog post or article.
---
Draft a technical article about: $ARGUMENTS

1. Before writing, ask me up to 5 questions about the problem, the constraints,
   the decisions made, how it was validated on hardware, and what went wrong.
2. Using my answers, create the file in `src/content/blog/` following the
   frontmatter and structure defined in CLAUDE.md.
3. Review the draft against the confidentiality rule and flag anything questionable.
4. Do not commit: leave it ready for my review.
