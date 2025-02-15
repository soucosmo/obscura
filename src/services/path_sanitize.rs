use actix_web::web::Path;
use regex::Regex;

pub fn path_sanitize(path: Path<String>) -> Result<String, &'static str> {
    let re = Regex::new(r"^[a-zA-Z0-9]+(?:[/-][a-zA-Z0-9]+)*$").unwrap();

    dbg!(&path);

    if !re.is_match(&path) {
        return Err("Invalid path");
    }

    Ok(path.into_inner())
}
