# Backend

This is the documentation for the backend part of the kommunat

# Setting up

For setting up, you can use docker. We have several images: 

#### REDIS
```
docker run -p 6379:6379 -v /Users/strobsi/Projects/kommunat/data:/data -d redis redis-server --appendonly yes
```

