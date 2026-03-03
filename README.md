# ACNH Gift Guide

A web app for Animal Crossing: New Horizons players to track island villagers and match gifts from their personal inventory to each villager's style preferences.

## Features

### Villagers Tab
- Browse all 391 ACNH villagers
- Pin up to 10 villagers (island max) to the top of the list
- Each card shows name, species, personality, birthday, favorite styles (color-coded badges), and favorite colors (visual swatches)
- **Gift matching built in** — inventory items that match a villager's style appear directly on their card
- Fuzzy search across name, species, and personality
- Filter by personality and species (multi-select dropdowns, derived from data)

### Inventory Tab
- Two-panel layout: full clothing catalog on the left, your inventory sidebar on the right
- Search the catalog by name, style, or source (fuzzy matching)
- Filter by style and source (multi-select dropdowns, 31 individual sources)
- Add items from the catalog to your inventory; remove them from the sidebar
- 1,458 clothing items from the full ACNH catalog

### Gift Matching
- Automatically shown on each villager card — no separate tab needed
- Items in your inventory that match a villager's favorite style(s) are listed under "Matched gifts (N)"
- Items with no style match are hidden

## Planned
- Color-based matching (deferred pending a reliable data source for clothing colors)
- Gift tracking — mark items as gifted so they disappear from matching

## Data Sources

- **Villager data** — [acnh.co/villagers](https://acnh.co/villagers) (name, species, personality, styles, colors)
- **Clothing data** — [Nookipedia All Clothing](https://nookipedia.com/wiki/Clothing/New_Horizons/All_clothing) (item name, style, price, source)

Not affiliated with Nintendo.

## Tech Stack

- React 18 + Vite
- Fuse.js for fuzzy search
- localStorage for persistence (no backend, no accounts)
- Deployed on Vercel

## Getting Started

```bash
npm install
npm run dev
```
