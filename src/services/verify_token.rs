use crate::dao::{Token, VerifyToken};


pub async fn verify_token(token: &Token, path: &str, write: bool) -> VerifyToken {
    if token.is_root {
        dbg!("is root");
        return VerifyToken::Allowed;
    }

    for (key, vpath) in &token.paths {
        dbg!(&key);
        dbg!(&path);
        if path.starts_with(key) {
            if write && !vpath.write{
                dbg!("Forbidden 1");
                return VerifyToken::Forbidden;
            }

            dbg!("Allowed 1");

            return VerifyToken::Allowed;
        }
    }

    dbg!("Forbidden 2");
    VerifyToken::Forbidden
}
