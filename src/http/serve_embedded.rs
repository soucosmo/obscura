use actix_web::{get, HttpResponse, HttpRequest, Responder};
use include_dir::{include_dir, Dir};
use mime_guess::from_path;

static STATIC_DIR: Dir<'_> = include_dir!("ui/dist");

#[get("/{filename:.*}")]
async fn serve_embedded(req: HttpRequest) -> impl Responder {
    let filename = req.match_info().query("filename").to_string();
    let filepath = if filename.is_empty() { "index.html" } else { &filename };

    match STATIC_DIR.get_file(filepath) {
        Some(file) => {
            let mime = from_path(filepath).first_or_octet_stream();
            HttpResponse::Ok().content_type(mime).body(file.contents())
        }
        None => HttpResponse::NotFound().body("404 - File Not Found"),
    }
}