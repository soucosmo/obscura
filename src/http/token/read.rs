use crate::dao::{AppState, Token};
use uuid::Uuid;
use actix_web::{
    HttpResponse,
    Responder,
    get,
    web::{
        Data,
        Path,
    },
};

#[get("/token/{token}")]
pub async fn read(path: Path<Uuid>, app_state: Data<AppState>,) -> impl Responder {
    let token = path.into_inner();

    let read = app_state.partitions.tokens.get(
        token.to_string().as_str()
    );

    match read {
        Ok(res) if res.is_some() => {
            let res = res.unwrap();

            let res: Token = serde_json::from_slice(&res).unwrap();

            HttpResponse::Ok().json(res)           
        },
        Ok(_) => {
            HttpResponse::NotFound().body("the token is not valid")
        },
        Err(e) => {
            HttpResponse::InternalServerError().body(e.to_string())
        }        
    }
}