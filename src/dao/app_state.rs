use super::Partitions;
use fjall::Keyspace;
use std::sync::Arc;

pub struct AppState {
    pub keyspace: Arc<Keyspace>,
    pub partitions: Partitions,
}
