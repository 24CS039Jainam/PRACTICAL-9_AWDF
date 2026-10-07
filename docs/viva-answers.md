# Practical 9 Viva Preparation — Jainam Khetani (24CS039)

### Why invalidate cache after POST/PUT/DELETE?

Because the database data has changed. Without invalidation, GET /tasks could return an older cached response until the TTL expires.

### Why use a fixed cache key?

A fixed key such as `all_tasks` lets repeated requests find the same cached value. If the key changed for every request, every request would become a cache miss.

### Why 60 seconds?

It is a reasonable lab TTL: long enough to demonstrate repeated cache hits, but short enough to avoid keeping stale data indefinitely.

### Why is node-cache not suitable for multiple servers?

The cache is stored in the memory of one Node.js process. Another server instance has its own memory and therefore does not automatically see the first instance's cached data.

### What is a cache HIT?

The requested data already exists in the cache, so MongoDB does not need to be queried for that request.

### What is a cache MISS?

The data is not available in the cache, so the server queries MongoDB and then stores the result in the cache.

### What happens after a server restart?

The in-memory cache is cleared. This is expected behavior.

### What should be shown in the performance comparison?

Three actual response-time readings with caching disabled and three actual readings with caching enabled.
