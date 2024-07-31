## Project Description
A node API that can be used to consume CSV data, perform outlier detection using the 1.5 times interquartile range method (1.5*IRQ).
If numerical data contains no outlier data this is then stored in a new table named "csv_import_${uuid}".
The new tables are tracked using the data_uploads table which saves each table name and assigns it a new id.

***Full Technical test outline can be found in ```TASK.md``` inside the root directory.***

Two csv files are provided inside ```/test_csv``` directory: 
- **success.csv** - which contains no outliers and <br>
- **rejected.csv** which contains outliers


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
DB_URL=postgres://postgres:password@postgres_db:5432/my_database

POSTGRES_PASSWORD=password
POSTGRES_USER=postgres
POSTGRES_DB=my_database
```
- `docker compose --env-file .env.production up`

### View Uploaded Data: 
 To verify the data is being stored you can run a bash shell inside the docker container to query the database: <br>
```docker exec -it "{docker-db-reference}" bash```

Connect to db:```psql -U postgres -d my_database``` <br>
List tables: ```\dt``` <br>
View uploads: ```SELECT * FROM data_uploads;```

![table example](/images/example.png)

### Personal Learning Outcomes/Challenges: 

**Creating the project**: I researched how to create a Node/Express API and connect it to a PostgreSQL database. I followed some basic example projects for guidance, starting by exposing a basic "/" endpoint. Once completed, I created a simple `data_uploads` table to store text alongside a random number, verifying that I could store data in PostgreSQL database. <br>

**Configuring the fs module to convert the CSV into a JS Record:** Initially, I incorrectly implemented `.pipe()` and `csvParser`, which resulted in storing the column names as the first line of data. I fixed this by reading the documentation and finding examples on converting streams into an array of record objects. <br>

**Converting strings to numbers:** I needed to extract key values from each row to set the appropriate type (number or text). Initially, I used a hardcoded column name to convert the type to numeric. To remove the hardcoding, I iterated through the row keys, checking each key's type during processing and converting number strings into numbers. <br>

**Outlier detection:** I researched methods for identifying outliers in numerical datasets. Initially, I calculated the mean of the values and set a tolerance for how far a value could be from the mean. However, I realized this method might be too restrictive with larger datasets. Instead, I focused on using the lower and upper quartiles to create an interquartile range (IQR) and used this to determine if a value was too small or too large.

**Return break error:** I used a return statement inside a for loop, assuming it would break out of the loop and return from the nested function. However, unit tests showed it always defaulted to false regardless of the data. To fix this, I used the `some` method to iterate through the records, returning true when an outlier matched the boundary condition. This eliminated the need for two return statements.