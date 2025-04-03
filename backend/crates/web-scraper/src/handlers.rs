use actix_web::{get, web, HttpResponse, Result};
use crate::utils::scrape_wikipedia;
use simple_summarizer::summarizer::summarize;

#[get("/wiki-brief/{title}")]
pub async fn scrape(title: web::Path<String>) -> Result<HttpResponse> {
    // Fetch and parse Wikipedia content based on the given title
    let parsed_data = scrape_wikipedia(&title.into_inner()).await?;

    // Generate a text summary from the parsed content
    let summary = summarize(&parsed_data.legible_text);

    // Return the summary as a plain text HTTP response
    Ok(HttpResponse::Ok()
        .content_type("text/plain; charset=utf-8")
        .body(format!("{}", summary)))
}
