use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
use crate::dao::Path;


#[derive(Serialize, Deserialize)]
pub struct TokenWrite {
    pub description: String,
    pub is_root: bool,
    pub paths: BTreeMap<String, Path>,
}
