use crate::services::path_sanitize;
use crate::dao::AppState;
use actix_web::{
    HttpResponse,
    Responder,
    delete,
    web::{
        Data,
        Path,
    },
};

#[delete("/config-map/{path:.*}")]
pub async fn remove(path: Path<String>, app_state: Data<AppState>) -> impl Responder {
    let config_path = path_sanitize(path);

    if let Err(e) = config_path {
        return HttpResponse::BadRequest().body(e);
    }

    let config_path = config_path.unwrap();

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
