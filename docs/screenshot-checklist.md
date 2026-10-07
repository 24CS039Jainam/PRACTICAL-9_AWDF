# Practical 9 Screenshot Checklist — Jainam Khetani (24CS039)

Take the screenshots in this order.

## IMPORTANT

The university handout says to record **uncached readings before adding/using the cache**, because otherwise the comparison is not fair.

This project provides `CACHE_ENABLED=false` specifically so the uncached measurement can be performed safely without deleting the implementation.

---

### Screenshot 1 — Server running

**Action:** Run `npm start`.

**Capture:** VS Code terminal showing MongoDB connected and the API running on port 5000.

**Caption:**  
**Figure 1: Express server connected to MongoDB and running successfully**

---

### Screenshot 2 — Registration

**Action:** `POST /auth/register` in Postman.

Example body:

```json
{
  "email": "jainam24cs039@example.com",
  "password": "Jainam@123"
}
```

**Caption:**  
**Figure 2: Successful user registration for the Practical 9 API**

---

### Screenshot 3 — Login and JWT

**Action:** `POST /auth/login`.

**Capture:** Response containing the JWT token.

**Caption:**  
**Figure 3: Successful login and JWT token generation**

---

### Screenshot 4 — Uncached reading 1

Set `CACHE_ENABLED=false`, restart server, then send `GET /tasks`.

**Caption:**  
**Figure 4: First uncached GET /tasks response and measured API time**

---

### Screenshot 5 — Uncached reading 2

Send the same request again.

**Caption:**  
**Figure 5: Second uncached GET /tasks response and measured API time**

---

### Screenshot 6 — Uncached reading 3

Send the same request a third time.

**Caption:**  
**Figure 6: Third uncached GET /tasks response and measured API time**

---

### Screenshot 7 — Cached MISS

Set `CACHE_ENABLED=true`, restart server, then send `GET /tasks`.

**Capture:** Response showing `"cache": "MISS"` and Postman Time.

**Caption:**  
**Figure 7: Initial cached GET /tasks request producing a cache MISS**

---

### Screenshot 8 — Cached HIT

Send `GET /tasks` again.

**Capture:** Response showing `"cache": "HIT"` and Postman Time.

**Caption:**  
**Figure 8: Repeated GET /tasks request served from the in-memory cache**

---

### Screenshot 9 — Second cached HIT

Send `GET /tasks` one more time.

**Caption:**  
**Figure 9: Third cached GET /tasks measurement demonstrating repeated cache hits**

---

### Screenshot 10 — Cache statistics

Open:

`GET /debug/cache/stats`

**Capture:** hits, misses, TTL and cache keys.

**Caption:**  
**Figure 10: Cache hit/miss statistics and configured 60-second TTL**

---

### Screenshot 11 — Cache invalidation after POST

Create a new task using `POST /tasks`.

Then request `GET /tasks`.

The next GET should be a MISS because the write invalidated the cache.

**Caption:**  
**Figure 11: POST task operation followed by cache invalidation and fresh GET**

---

### Screenshot 12 — Single-task cache

Use the returned task ID with:

`GET /tasks/:id`

Repeat it once.

The first should be MISS and the second should be HIT.

**Caption:**  
**Figure 12: Separate caching of the GET /tasks/:id endpoint**

---

### Screenshot 13 — GitHub repository

Show the repository containing the Practical 9 code, README and docs.

**Caption:**  
**Figure 13: GitHub repository containing the completed Practical 9 implementation**

---

## Screenshots NOT required

Deployment is **not explicitly listed** in the Practical 9 GitHub Deliverables. The handout requires a repository update, node-cache implementation, response-time comparison documentation and a caching-specific commit.

Therefore, a deployed URL is optional unless your faculty separately instructs you to deploy.
