use actix_web::{get, Responder};

#[get("/ping")]
pub async fn ping() -> impl Responder {
    "pong"
}
