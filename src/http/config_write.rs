use crate::dao::AppState;
use serde_json::Value;
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


#[put("/config/{path:.*}")]
pub async fn config_write(path: Path<String>, body: Json<Value>, app_state: Data<AppState>) -> impl Responder {
    let config_path = path.into_inner();

    let config_path = config_path.replace("/", ".");
    
    let body = body.into_inner();

    let body = serde_json::to_vec(&body).unwrap();

    let res = app_state.partitions.configs.insert(
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

