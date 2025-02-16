use super::http_response::http_response;
use crate::dao::{AppState, Token};
use std::collections::BTreeMap;
use crate::dto::TokenWrite;
use chrono::Utc;
use uuid::Uuid;
use actix_web::{
    HttpResponse,
    HttpRequest,
    Responder,
    put,
    web::{
        Data,
        Path,
        Json,
    },
};

#[put("/token/{token}")]
pub async fn write(path: Path<Uuid>, body: Json<TokenWrite>, app_state: Data<AppState>, req: HttpRequest) -> impl Responder {
    let token = path.into_inner();

    if let Err(e) = http_response("/", true, &app_state, req).await {
        return e;
    }

    let body = body.into_inner();

    let paths = if body.is_root {
        BTreeMap::new()
    } else {
        body.paths
    };

    let body = Token {
        description: body.description,
        is_root: body.is_root,
        paths,
        created_at: Utc::now().naive_utc(),
        updated_at: Utc::now().naive_utc(),
    };

    let body = serde_json::to_vec(&body).unwrap();

    let res = app_state.partitions.tokens.insert(
        token.clone().to_string(),
        body
    );

    match res {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => {
            HttpResponse::InternalServerError().body(e.to_string())
        }
    }
}

