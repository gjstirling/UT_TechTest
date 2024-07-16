## Project Description
A node API that can be used to consume CSV data, perform outlier detection using the 1.5 times interquartile range method (1.5*IRQ). 
If numerical data contains no outlier data this is then stored in a new table named "csv_import_${uuid}". 
The new tables are tracked using the data_uploads table which saves each table name and assigns it a new id. 

Two csv files are provided inside ```/test_csv``` directory ***success.csv*** - 
which contains no outliers and ***rejected.csv*** which contains outliers.

### Endpoints and base url:
POST ```/upload``` - attached .csv file <br>
URL: http://localhost:5175/upload

## Running the application 
### Locally 
- Install dependencies: ```npm i``` <br>
- Generate DB schema: ```npm run db:generate``` <br>
- Perform migration:```npm run db:migrate``` <br>
- Connect Database: ```npm run dev:db``` <br>
- Locally run app: ``` npm run dev ``` 

### Production - run via docker compose
- docker compose -f docker-compose.db.yaml up <br>
- docker compose --env-file .env.production up
