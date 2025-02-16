use crate::{dao::{AppState, Token, VerifyToken}, services::verify_token};
use actix_web::{web::Data, HttpRequest, HttpResponse};

pub async fn http_response(path: &str, write: bool, app_state: &Data<AppState>, req: HttpRequest) -> Result<Token, HttpResponse> {
    if let Some(auth) = req.headers().get("Authorization") {
        if let Ok(token) = auth.to_str() {
            let token = token.to_string();
            let token = token.replace("Bearer ", "");
            let token = token.trim();

            let token = app_state.partitions.tokens.get(token);

            if let Err(e) = token {
                return Err(HttpResponse::Forbidden().body(e.to_string()));
            }

            let token = token.unwrap();

            if token.is_none() {
                return Err(HttpResponse::Forbidden().finish());
            }

            let token = token.unwrap();

            let token: Token = serde_json::from_slice(&token).unwrap();

            return match verify_token(&token, path, write).await {
                VerifyToken::Allowed => Ok(token),
                VerifyToken::Error(e) => Err(HttpResponse::InternalServerError().body(e)),
                VerifyToken::Forbidden => Err(HttpResponse::Forbidden().finish())
            };
        }
    }

    Err(HttpResponse::Forbidden().finish())

}
