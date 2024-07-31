## Task Instructions

This Technical Task is to illustrate the thought processes and ability to be able to
consume data, check data and insert the data into an SQL containerised
database. Please provide your code via relevant means (such as Github) and a ReadMe file
explaining how to run your code. Note your approach, thoughts, any problems
you encountered and how they were overcome for discussion.

The task aims to consume data from a csv through a web api, use it to infer and
create an appropriate table for SQL with the correct data types, perform some
basic outlier detection on it and insert the data into an SQL container using the language of your choice if no outliers are detected. There’s no need to make a
frontend; you can simply use something like postman to upload the csv to the
web service.

We would like you to Dockerize your application and to aid we have provided you
with a base docker compose file ( use docker-compose to connect the containers)
to simplify the process to remove the need to configure postgres although feel
free to use any sql database. 

```
version: '2'
    services:
    postgres:
    image: postgres:9.3
    ports:
        - "5432:5432"
```

You are provided with two test csv files. One that passes and one that fails
shown here: <br> 

Success<br>
```
timestamp,value,category
2022-01-01 00:00:00,10,A
2022-01-01 01:00:00,12,B
2022-01-01 02:00:00,11,C
2022-01-01 03:00:00,13,A
2022-01-01 04:00:00,9,B
2022-01-01 05:00:00,10,C
2022-01-01 06:00:00,12,A
2022-01-01 07:00:00,11,B
2022-01-01 08:00:00,13,C
2022-01-01 09:00:00,10,A
```

Rejected <br> 
```
timestamp,value,category
2022-01-01 00:00:00,10,A
2022-01-01 01:00:00,12,B
2022-01-01 02:00:00,11,C
2022-01-01 03:00:00,13,A
2022-01-01 04:00:00,9,B
2022-01-01 05:00:00,10,C
2022-01-01 06:00:00,12,A
2022-01-01 07:00:00,11,B
2022-01-01 08:00:00,100,C
2022-01-01 09:00:00,10,A
```
