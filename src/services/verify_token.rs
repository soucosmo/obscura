use crate::dao::{Token, VerifyToken};


pub async fn verify_token(token: &Token, path: &str, write: bool) -> VerifyToken {
    if token.is_root || token.paths.contains_key("/") {
        return VerifyToken::Allowed;
    }

    for (key, vpath) in &token.paths {
        if key.starts_with(path) {
            if write && !vpath.write{
                return VerifyToken::Forbidden;
            }

            return VerifyToken::Allowed;
        }
    }

    VerifyToken::Forbidden
}
