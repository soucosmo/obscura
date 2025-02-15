use crate::dao::{AppState, ConfigMap};
use crate::services::path_sanitize;
use actix_web::{
    HttpResponse,
    Responder,
    get,
    web::{
        Data,
        Path,
    },
};

#[get("/config-map/{path:.*}")]
pub async fn read(path: Path<String>, app_state: Data<AppState>) -> impl Responder {
    let config_path = path_sanitize(path);

    if let Err(e) = config_path {
        return HttpResponse::BadRequest().body(e);
    }

    let config_path = config_path.unwrap();

    let read = app_state.partitions.config_maps.get(
        config_path.as_str()
    );

    match read {
        Ok(res) if res.is_some() => {
            let res = res.unwrap();

            let res: ConfigMap = serde_json::from_slice(&res).unwrap();

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