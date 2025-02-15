use crate::dao::{AppState, ConfigMap};
use crate::services::path_sanitize;
use serde_json::Value;
use chrono::Utc;
use actix_web::{
    HttpResponse,
    Responder,
    put,
    web::{
        Data,
        Path,
        Json,
    },
};

#[put("/config-map/{path:.*}")]
pub async fn write(path: Path<String>, body: Json<Value>, app_state: Data<AppState>) -> impl Responder {
    let config_path = path_sanitize(path);

    if let Err(e) = config_path {
        return HttpResponse::BadRequest().body(e);
    }

    let config_path = config_path.unwrap();
    
    let body = body.into_inner();

    let config_map = ConfigMap {
        content: body,
        created_at: Utc::now().naive_utc(),
        updated_at: Utc::now().naive_utc(),
    };

    let body = serde_json::to_vec(&config_map).unwrap();

    let res = app_state.partitions.config_maps.insert(
        config_path.as_str(),
        body
    );

    match res {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => {
            HttpResponse::InternalServerError().body(e.to_string())
        }
    }
}

