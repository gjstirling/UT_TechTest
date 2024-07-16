## Project Description
A node API that can be used to consume CSV data, perform outlier detection using the 1.5 times interquartile range method (1.5*IRQ).
If numerical data contains no outlier data this is then stored in a new table named "csv_import_${uuid}".
The new tables are tracked using the data_uploads table which saves each table name and assigns it a new id.

Two csv files are provided inside ```/test_csv``` directory: <br>
- ***success.csv*** - which contains no outliers and <br>
- ***rejected.csv*** which contains outliers

### Endpoints and base url:
POST ```/upload``` - attached .csv file <br>
URL: http://localhost:5175/upload

## Running the application
### Locally
- Install dependencies: ```npm i``` <br>
- Start the development database `docker compose -f docker-compose.db.yaml up -d` <br>
- Generate DB schema: ```npm run db:generate``` <br>
- Perform migration:```npm run db:migrate``` <br>
- Locally run app: ``` npm run dev ```

### Production - run via docker compose
- create a `.env.production` file and add the following variables:
```
PORT=5175
HOST=localhost
DB_URL=postgres://postgres:password@postgres_db:5432/urban_tide

POSTGRES_PASSWORD=password
POSTGRES_USER=postgres
POSTGRES_DB=urban_tide
```
- `docker compose --env-file .env.production up`
