# Mini Project Nodejs


## Setup

### Install

```
npm install
```
### Run

```
npm run test
```
### Run Test

```
npm run test
```

### Run Development

```
npm run dev
```

## Documentation Swagger
```url
[SWAGGER] https://app.swaggerhub.com/apis-docs/rizama/miniproject-nodejs/1.0.0
```

## Usage

## 1. Prime Number
```
[ENDPOINT] /api/prime
[PARAMS] start={number}
```
```url
[GET] http://localhost:5000/api/prime?start=5
```

### Sample Response
```json
{
    "code": 200,
    "mesage": "success",
    "data": [7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83]
}
```

## 2 Users with Excel as Database
### 2.1 Insert Data
```
[ENDPOINT] /api/users
```
```url
[POST] http://localhost:5000/api/users
```
#### Sample Body
```json
{
    "id": 1,
    "email": "rachel.howell@reqres.in",
    "first_name": "Rachel",
    "last_name": "Howell",
    "avatar": "https://reqres.in/img/faces/12-image.jpg"
}
```

#### Sample Response
```json
{
    "code": 201,
    "mesage": "created",
    "data": {
        "id": 1,
        "email": "rachel.howell@reqres.in",
        "firstName": "Rachel",
        "lastName": "Howell",
        "avatar": "https://reqres.in/img/faces/12-image.jpg"
    }
}
```

### 2.2 Show Data
```
[ENDPOINT] /api/users
[PARAMS - REQUIRED] page={number}
[PARAMS - OPTIONAL] limit={number}
```
```url
[GET] http://localhost:5000/api/users?page=1&limit=5
```
#### Sample Response
```json
{
    "code": 200,
    "mesage": "success",
    "data": {
        "next": {
            "page": 2,
            "limit": 5
        },
        "previous": {
            "page": null,
            "limit": 5
        },
        "total_page": 3,
        "total_data": 11,
        "results": [
            {
                "id": 1,
                "email": "michael.lawson@reqres.in",
                "first_name": "Michael",
                "last_name": "Lawson",
                "avatar": "https://reqres.in/img/faces/7-image.jpg"
            },
            {
                "id": 2,
                "email": "lindsay.ferguson@reqres.in",
                "first_name": "Lindsay",
                "last_name": "Ferguson",
                "avatar": "https://reqres.in/img/faces/8-image.jpg"
            },
            {
                "id": 3,
                "email": "janet.weaver@reqres.in",
                "first_name": "Janet",
                "last_name": "Weaver",
                "avatar": "https://reqres.in/img/faces/2-image.jpg"
            },
            {
                "id": 4,
                "email": "emma.wong@reqres.in",
                "first_name": "Emma",
                "last_name": "Wong",
                "avatar": "https://reqres.in/img/faces/3-image.jpg"
            },
            {
                "id": 5,
                "email": "eve.holt@reqres.in",
                "first_name": "Eve",
                "last_name": "Holt",
                "avatar": "https://reqres.in/img/faces/4-image.jpg"
            }
        ]
    }
}
```