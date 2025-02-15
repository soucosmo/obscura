use crate::dao::AppState;
use serde_json::Value;
use actix_web::{
    HttpResponse,
    Responder,
    get,
    web::{
        Data,
        Path,
    },
};

#[get("/config/{path:.*}")]
pub async fn read(path: Path<String>, app_state: Data<AppState>) -> impl Responder {
    let config_path = path.into_inner();

    let config_path = config_path.replace("/", ".");

    let read = app_state.partitions.configs.get(
        config_path.as_str()
    );

    match read {
        Ok(res) if res.is_some() => {
            let res = res.unwrap();

            let res: Value = serde_json::from_slice(&res).unwrap();

            HttpResponse::Ok().json(res)           
        },
        Ok(_) => {
            HttpResponse::NotFound().finish()
        },
        Err(e) => {
            HttpResponse::InternalServerError().body(e.to_string())
        }        
    }
}
