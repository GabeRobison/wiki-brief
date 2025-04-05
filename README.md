# WikiBrief

Fast and responsive web application that delivers concise summaries of Wikipedia articles. Combines a high-performance [Rust](https://www.rust-lang.org/) backend with a modern [Vite](https://vitejs.dev/)[+]()[React](https://react.dev/) frontend to create an efficient and intuitive user experience.

![wikiBrief Gif](assets/wikiBrief.gif)

- [rust-summarizer](https://github.com/GabeRobison/rust-summarizer)
- [rust-web-scraper](https://github.com/GabeRobison/rust-web-scraper)

## Features

### Rust Backend

- Scrapes Wikipedia articles by title using `reqwest` and `scraper`
- Cleans and extracts human-readable content
- Summarizes text using a Term Frequency–Inverse Document Frequency (TF-IDF) algorithm
- Serves content through a RESTful API using Actix Web

### React Frontend

- Built with Vite for fast development and optimized builds
- Responsive UI styled with Tailwind CSS and animated with Framer Motion
- Search interface for any Wikipedia topic
- Displays clean, scrollable summaries
- Includes a "View on Wikipedia" button for full context

---

## Disclaimer

This application scrapes and summarizes content exclusively from Wikipedia. Wikipedia content is licensed under the Creative Commons Attribution-ShareAlike license. Do not use this tool to scrape other websites without confirming their terms of service.

---

## Getting Started

### Backend (Rust)

1. Ensure [Rust is installed](https://www.rust-lang.org/tools/install).
2. Navigate to `wiki-brief/backend`

#### Build and Run

```bash
cargo build
cargo run
```

---

### Frontend (React)

1. Ensure [Node.js installed](https://nodejs.org/en).
2. In another terminal navigate to `wiki-brief/frontend`

#### Setup and Run

```bash
npm install
npm run dev
```

By default, the frontend runs on:

```
http://localhost:5173
```
