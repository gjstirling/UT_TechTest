## Run application 
### Locally 
Install dependencies: ```npm i```
Generate DB schema: ```npm run db:generate```
Perform migration:```npm run db:migrate```
Connect Database: ```npm run dev:db```
Locally run app: ``` npm run dev ```

### Production - via docker
docker compose -f docker-compose.db.yaml up
docker compose --env-file .env.production up