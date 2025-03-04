use crate::repositories::load_partition;
use crate::dao::{Partitions, config};
use fjall::Keyspace;
use std::sync::Arc;

pub fn load_partitions(keyspace: Arc<Keyspace>) -> Partitions {
    Partitions {
        core: load_partition(keyspace.clone(), config::PARTITION_CORE),
        config_maps: load_partition(keyspace.clone(), config::PARTITION_CONFIG_MAPS),
        tokens: load_partition(keyspace.clone(), config::PARTITION_TOKENS),
    }
}
