# Search Engine

Description                   | Command
----------------------------- | -----------------------------
Test ElasticSearch is up      | curl http://localhost:9200

## Troubleshooting

### ElasticSearch

```
bootstrap check failure [1] of [1]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]

exited with code 78
```
1. sysctl -w vm.max_map_count=262144
2. systemctl restart docker
