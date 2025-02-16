use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Path {
    pub write: bool,
}
