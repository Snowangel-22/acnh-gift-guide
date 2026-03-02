# ACNH Gift Guide

A web app for Animal Crossing: New Horizons players to track island villagers and match gifts from their inventory to each villager's preferences.

## Features

### 1. Villager Picker
- Browse all ~391 ACNH villagers
- Pin villagers on your island to the top of the list
- Each villager shows their personality, favorite styles, and favorite colors

### 2. Inventory
- Input clothing items you have available to gift
- Search/filter your inventory by name
- Data sourced from the full ACNH clothing catalog

### 3. Gift Matching
For each pinned villager, inventory items that match their favorite **style** are shown. Items with no style match are hidden.

Color matching is planned for a future update once a reliable data source is available.

### 4. Gift Tracking *(planned)*
- Mark an item as "gifted" to a villager
- Gifted items move out of inventory and disappear from the matching view

## Data Sources

- **Villager data** — [acnh.co/villagers](https://acnh.co/villagers) (name, species, personality, styles, colors)
- **Clothing data** — [Nookipedia All Clothing](https://nookipedia.com/wiki/Clothing/New_Horizons/All_clothing) (item name, style, buy/sell price, source)

> Note: Nookipedia's clothing list does not include color per item. Color matching will be added in a future update.

## Tech Stack

- React + Vite
- Deployed on Vercel

## Getting Started

```bash
npm install
npm run dev
```
