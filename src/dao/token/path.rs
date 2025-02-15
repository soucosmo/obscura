use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Path {
    pub prefix: String,
    pub write: bool,
}
