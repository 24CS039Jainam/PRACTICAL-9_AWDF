const NodeCache = require("node-cache");

const ttl = Number(process.env.CACHE_TTL || 60);
const cache = new NodeCache({ stdTTL: ttl, checkperiod: Math.max(10, Math.floor(ttl / 2)) });

const counters = {
  hits: 0,
  misses: 0
};

function isEnabled() {
  return process.env.CACHE_ENABLED !== "false";
}

function read(key) {
  if (!isEnabled()) {
    return undefined;
  }

  const value = cache.get(key);

  if (value !== undefined) {
    counters.hits += 1;
    return value;
  }

  counters.misses += 1;
  return undefined;
}

function write(key, value) {
  if (isEnabled()) {
    cache.set(key, value);
  }
}

function remove(key) {
  if (isEnabled()) {
    cache.del(key);
  }
}

function clearTaskCaches() {
  if (isEnabled()) {
    cache.del("all_tasks");
    const keys = cache.keys().filter((key) => key.startsWith("task:") || key.startsWith("all_tasks:"));
    if (keys.length) cache.del(keys);
  }
}

function stats() {
  return {
    enabled: isEnabled(),
    ttlSeconds: ttl,
    hits: counters.hits,
    misses: counters.misses,
    keys: isEnabled() ? cache.keys() : [],
    totalLookups: counters.hits + counters.misses
  };
}

module.exports = { read, write, remove, clearTaskCaches, stats, cache };