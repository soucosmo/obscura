use actix_web::{web, App, HttpServer};
use std::sync::Arc;
use fjall::Config;
mod repositories;
mod services;
mod http;
mod dao;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let keyspace = Arc::new(
        Config::new(dao::config::DEFAULT_KEYSPACE)
            .open()
            .expect("keyspace load")
    );

    let partitions = services::load_partitions(keyspace.clone());

    let app_state = dao::AppState {
        keyspace,
        partitions,
    };

    let app_state = web::Data::new(app_state);

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .service(
                web::scope(dao::config::PREFIX_API)
                    .service(http::ping::ping)
                    .service(http::config::read::read)
                    .service(http::config::write::write)
                    .service(http::config::remove::remove)
                    .service(http::token::root_generate::root_generate)
            )
    })
    .bind((dao::config::DEFAULT_HOST, dao::config::DEFAULT_PORT))?
    .run()
    .await
}