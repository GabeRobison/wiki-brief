use reqwest::Client;
use scraper::{Html, Selector};
use regex::Regex;
use crate::models::ParsedData;

pub async fn scrape_wikipedia(title: &str) -> Result<ParsedData, Box<dyn std::error::Error>> {
    let client = Client::new();
    let wiki_url = format!("https://en.wikipedia.org/wiki/{}", title);

    // Make the request and get the body text
    let response = client.get(&wiki_url).send().await?;
    let body = response.text().await?;
    let document = Html::parse_document(&body);

    // Try to grab the main page title (e.g., the article heading)
    let title_selector = Selector::parse("h1").unwrap();
    let title: String = document
        .select(&title_selector)
        .next()
        .map(|element| element.text().collect::<Vec<_>>().join("").trim().to_string())
        .unwrap_or_default();

    // Grab the main content block
    let content_selector = Selector::parse("#mw-content-text").unwrap();
    let mut legible_text = String::new();

    if let Some(content_element) = document.select(&content_selector).next() {
        // Pull out paragraphs and headers from the article
        let elements = Selector::parse("p, h1, h2, h3, h4, h5, h6").unwrap();
        for element in content_element.select(&elements) {
            legible_text.push_str(&element.text().collect::<Vec<_>>().join(""));
        }
    }

    // Remove [number] references from the text (e.g., [80], [126])
    let citation_cleanup = Regex::new(r"\[\d+\]").unwrap();
    let cleaned_text = citation_cleanup.replace_all(&legible_text, "").to_string();

    Ok(ParsedData { title, legible_text: cleaned_text })
}
