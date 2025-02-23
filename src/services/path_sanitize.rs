use actix_web::web::Path;
use regex::Regex;

pub fn path_sanitize(path: Path<String>) -> Result<String, &'static str> {
    let re = Regex::new(r"^(?:\*|[a-zA-Z0-9]+(?:[/-][a-zA-Z0-9]+)*)$").unwrap();


    if !re.is_match(&path) {
        return Err("Invalid path");
    }

    let path = path.into_inner();
    
    let path = path.as_str();

    if path == "*" {
        return Ok("".to_string())
    }

    Ok(
        format!(
            "/{}",
            path
        )
    )
}
