
use crate::dao::AppState;
use actix_web::{
    web::Data,
    HttpResponse,
    Responder,
    get,
};


#[get("/token/root-exists")]
pub async fn root_exists(app_state: Data<AppState>) -> impl Responder {
    let root_exists = app_state.partitions.tokens.is_empty();

    if let Err(e) = root_exists {
        return HttpResponse::InternalServerError().body(
            e.to_string()
        );
    }

    if !root_exists.unwrap() {
        return HttpResponse::Ok()
            .body("the root token has already been created")
    }

    HttpResponse::NotFound()
        .body("the root token has not been created yet")
}
