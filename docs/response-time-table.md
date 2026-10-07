# Practical 9 Response-Time Record — Jainam Khetani (24CS039)

Fill this table with the **actual Postman Time values**. Do not invent values.

| Condition | Reading 1 | Reading 2 | Reading 3 | Average |
|---|---:|---:|---:|---:|
| Uncached (`CACHE_ENABLED=false`) | ___ ms | ___ ms | ___ ms | ___ ms |
| Cached (`CACHE_ENABLED=true`) | ___ ms | ___ ms | ___ ms | ___ ms |

## Observation

The first cached request is expected to be a cache MISS because the data has not yet been stored in node-cache. Repeated GET requests should become cache HITs until the TTL expires or a write operation invalidates the cache.

## Why invalidation matters

POST, PUT and DELETE clear the task cache after a successful database write. This prevents an older cached task list from being returned after the database has changed.

## Limitation

node-cache is process-local memory. Restarting the Node process clears it, and separate server instances would each have their own independent cache. Therefore it is suitable for this lab but not a shared multi-instance cache.

## Comparison

After entering the actual readings, briefly state whether the cached requests were faster in this environment and mention that small local datasets may show only a modest difference.
