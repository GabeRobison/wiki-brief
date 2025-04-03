use actix_web::{App, HttpServer};
use actix_cors::Cors;

mod handlers;
mod models;
mod utils;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        // Basic CORS config to allow requests from the frontend
        let cors = Cors::default()
            .allowed_origin("http://localhost:5173")
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![actix_web::http::header::CONTENT_TYPE])
            .max_age(3600);

        App::new()
            .wrap(cors)
            .service(handlers::scrape) // registers the /wiki-brief/{title} route
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
