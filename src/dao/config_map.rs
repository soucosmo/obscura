use serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;
use serde_json::Value;

#[derive(Serialize, Deserialize)]
pub struct ConfigMap {
    pub content: Value,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}
