use super::super::token::http_response::http_response as token_http_response;
use crate::dao::{AppState, ConfigMap};
use crate::services::path_sanitize;
use std::collections::BTreeMap;
use actix_web::{
    HttpResponse,
    HttpRequest,
    Responder,
    get,
    web::{
        Data,
        Path,
    },
};

#[get("/config-map/{path:.*}/prefix")]
pub async fn read_prefix(path: Path<String>, app_state: Data<AppState>, req: HttpRequest) -> impl Responder {
    let config_path = path_sanitize(path);

    if let Err(e) = config_path {
        return HttpResponse::BadRequest().body(e);
    }

    let config_path = config_path.unwrap();

    if let Err(e) = token_http_response(
        config_path.as_str(),
        false,
        &app_state,
        req
    ).await {
        return e;
    }

    let read = app_state.partitions.config_maps.prefix(
        config_path.as_str()
    );

    let mut cms: BTreeMap<String, ConfigMap> = BTreeMap::new();

    for i in read {
        if let Err(e) = i {
            return HttpResponse::InternalServerError()
                .body(e.to_string());
        }

        let i = i.unwrap();

        cms.insert(
            String::from_utf8(i.0.to_vec()).unwrap(),
            serde_json::from_slice(&i.1).unwrap(),
        );
    }

    HttpResponse::Ok().json(cms)
}
