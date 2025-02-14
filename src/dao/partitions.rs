use fjall::PartitionHandle;

pub struct Partitions {
    pub configs: PartitionHandle,
    pub tokens: PartitionHandle,
    pub core: PartitionHandle,
}
