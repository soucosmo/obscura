use super::http_response::http_response as token_http_response;
use crate::dao::{AppState, Token, Path as BPath};
use crate::services::path_sanitize;
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
    let new_token = path.into_inner();

    let token = token_http_response(
        "/",
        false,
        &app_state,
        req
    ).await;

    if let Err(e) = token {
        return e;
    }

    let token = token.unwrap();

    if !token.is_root {
        return HttpResponse::Forbidden().body("only root tokens can create other tokens");
    }

    let body = body.into_inner();

    let (paths, paths_error): (BTreeMap<String, BPath>, bool) = if body.is_root {
        (BTreeMap::new(), false)
    } else {
        let mut paths = BTreeMap::new();

        let mut error = false;

        for (vpath, bpath) in body.paths {
            let vpath = path_sanitize(Path::from(vpath));

            if let Ok(vpath) = vpath {
                paths.insert(vpath, bpath);
                continue;
            }

            error = true;

            break;
        }

        (paths, error)
    };

    if paths_error {
        return HttpResponse::BadRequest().body("foi encontrado um path inválido");
    }

    let body = Token {
        description: body.description,
        is_root: body.is_root,
        paths,
        created_at: Utc::now().naive_utc(),
        updated_at: Utc::now().naive_utc(),
    };

    let body = serde_json::to_vec(&body).unwrap();

    let res = app_state.partitions.tokens.insert(
        new_token.to_string(),
        body
    );

    match res {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => {
            HttpResponse::InternalServerError().body(e.to_string())
        }
    }
}

