use serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;
mod paths;
mod path;

pub use paths::Paths;
pub use path::Path;

#[derive(Serialize, Deserialize)]
pub struct Token {
    pub description: String,
    pub is_root: bool,
    pub paths: Paths,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}
