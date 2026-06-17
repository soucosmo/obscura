use super::super::token::http_response::http_response as token_http_response;
use crate::services::path_sanitize;
use crate::dao::AppState;
use actix_web::{
    HttpResponse,
    HttpRequest,
    Responder,
    delete,
    web::{
        Data,
        Path,
    },
};

#[delete("/config-map/{path:.*}")]
pub async fn remove(path: Path<String>, app_state: Data<AppState>, req: HttpRequest) -> impl Responder {
    let config_path = path_sanitize(path);

    if let Err(e) = config_path {
        return HttpResponse::BadRequest().body(e);
    }

    let config_path = config_path.unwrap();

    if let Err(e) = token_http_response(
        config_path.as_str(),
        true,
        &app_state,
        req
    ).await {
        return e;
    }

    let read = app_state.partitions.config_maps.remove(
        config_path.as_str()
    );

    match read {
        Ok(()) => {
            HttpResponse::Ok().finish()
        },
        Err(e) => {
            HttpResponse::InternalServerError().body(e.to_string())
        }
    }
}
