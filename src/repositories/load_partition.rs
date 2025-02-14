use fjall::{PartitionCreateOptions, Keyspace, PartitionHandle};
use std::sync::Arc;

pub fn load_partition(keyspace: Arc<Keyspace>, partition_name: &str) -> PartitionHandle {
    keyspace.open_partition(partition_name, PartitionCreateOptions::default()).unwrap()
}
