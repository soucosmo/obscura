use crate::dao::{Token, VerifyToken};


pub async fn verify_token(token: &Token, path: &str, write: bool) -> VerifyToken {
    if token.is_root {
        return VerifyToken::Allowed;
    }

    for (key, vpath) in &token.paths {
        // Match on path-segment boundaries, not raw string prefixes, so a token
        // scoped to "/app" does not also grant "/app-prod" or "/application".
        let scoped = path == key
            || key.is_empty()
            || path.starts_with(&format!("{}/", key.trim_end_matches('/')));

        if scoped {
            if write && !vpath.write {
                return VerifyToken::Forbidden;
            }

            return VerifyToken::Allowed;
        }
    }

    VerifyToken::Forbidden
}
