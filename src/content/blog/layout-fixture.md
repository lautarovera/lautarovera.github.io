---
title: Layout fixture
description: Exercises every article element. Draft only; never built for production.
date: 2026-09-21
tags: [fixture]
lang: en
block: firmware
draft: true
---

This file checks the article layout in `npm run dev`. It is not an article.
The text below is filler with the shape of a real post.

## The problem

A paragraph long enough to wrap several times, so line length and leading can
be judged. The reading column should hold roughly seventy characters per line,
which keeps long technical explanations comfortable to follow.

<aside class="note">Margin note: on wide screens this sits to the right of the
paragraph. On narrow screens it appears inline, under it.</aside>

A second paragraph with `inline code`, a [link](/), *emphasis* and **strong**
text.

## The constraints

### Memory

| Parameter    | Value     | Condition            |
| ------------ | --------- | -------------------- |
| Flash budget | 000 KiB   | filler value         |
| RAM budget   | 000 KiB   | filler value         |
| Wake latency | 0.0 ms    | filler value         |

### Timing

- A bulleted item.
- Another item, long enough to wrap onto a second line so the hanging indent
  can be checked.

1. A numbered step.
2. Another step.

## The decision

```c
static void example(void)
{
    /* Code block: long lines scroll horizontally instead of breaking the page layout. */
}
```

> A blockquote, for quoting a datasheet or an erratum.
