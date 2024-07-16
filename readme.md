## Run application 

##

### Locally 
- Install dependencies: ```npm i``` <br>
- Generate DB schema: ```npm run db:generate``` <br>
- Perform migration:```npm run db:migrate``` <br>
- Connect Database: ```npm run dev:db``` <br>
- Locally run app: ``` npm run dev ``` 

### Production - run via docker compose
- docker compose -f docker-compose.db.yaml up <br>
- docker compose --env-file .env.production up