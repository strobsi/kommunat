# kommunat
Kommunat project for changing the future of politics

Kommunat is the new and innovative way to figure out what to vote for in political votings on a regional scope. 


## Architrecture

This section describes the global architecture of the kommunat. It consists of several subsection to make reading through the stack easier.

### Frontend

- Bootstrap 4 ( https://getbootstrap.com/ )
- HammerJS ( https://hammerjs.github.io/ )

### Backend
- Node.js ( api / backend ) with express https://expressjs.com/de/
- Postgres ( https://www.postgresql.org/ )

### RBAC
- Keycloak ( https://www.keycloak.org/ )
 
### Deployment

We only stick to containers, as they tremendously make our lives easier. 
- Docker ( https://www.docker.com/ )
- Docker-Compose ( https://docs.docker.com/compose/ )
