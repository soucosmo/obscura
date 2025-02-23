use actix_web::{web, App, HttpServer};
use std::env::{set_var, var};
use actix_cors::Cors;
use std::sync::Arc;
use fjall::Config;
mod repositories;
mod services;
mod http;
mod dto;
mod dao;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    set_var("RUST_LOG", "info");
    set_var("RUST_BACKTRACE", "1");

    env_logger::init();

    let host = var("OBSCURA_HOST").unwrap_or(
        dao::config::DEFAULT_HOST.to_string()
    );

    let port = var("OBSCURA_PORT").unwrap_or(
        dao::config::DEFAULT_PORT.to_string()
    );

    let path = var("OBSCURA_PATH").unwrap_or(
        dao::config::DEFAULT_KEYSPACE.to_string()
    );

    let keyspace = Arc::new(
        Config::new(
                format!("{}/.obscura", path)
            )
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
            .wrap(Cors::permissive())
            .app_data(app_state.clone())
            .service(
                web::scope(dao::config::PREFIX_API)
                    .service(http::ping::ping)
                    .service(http::config_map::read_prefix::read_prefix)
                    .service(http::config_map::read::read)
                    .service(http::config_map::write::write)
                    .service(http::config_map::remove::remove)
                    .service(http::token::root_exists::root_exists)
                    .service(http::token::read::read)
                    .service(http::token::root_generate::root_generate)
                    .service(http::token::write::write)
            )
    })
    .bind((host, port.parse().unwrap()))?
    .run()
    .await
}