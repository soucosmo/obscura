use fjall::PartitionHandle;

pub struct Partitions {
    pub config_maps: PartitionHandle,
    pub tokens: PartitionHandle,
    pub core: PartitionHandle,
}
