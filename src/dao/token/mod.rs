use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
use chrono::NaiveDateTime;
pub use path::Path;
mod path;


#[derive(Serialize, Deserialize)]
pub struct Token {
    pub description: String,
    pub is_root: bool,
    pub paths: BTreeMap<String, path::Path>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}
