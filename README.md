# MyStore

## Server Side

### Description

The server side for managing an online Store.
It includes various user, products and categories management features.
It was built with node.js.

### Install

1. Download the project.
1. In the server folder (/storeBack) do

```
npm i
```

to install all the required libraries.

3. Change the ".env.example" file to ".env" and enter the various variables (if needed). Delete all variables which are not needed.
   Default values for various variables, used in the project, can be found under config->default.json.

4. After configuring the server (as portrayed above), you can do:

```
npm run dev
```

for development purposes,

```
npm run start
```

for production.

### Seeding the DB

For seeding the DB with 11 products, 5 categories and 2 users (regular,admin) and their carts.

```
npm run seed-db
```

1. The seeding process empties all collections (products,categories,users) before inserting the data.
1. The seeded data can be changed in scripts->dbSeederData.

### Usage

#### Routes

##### User Routes

| No. | URL          | METHOD | Authorization                | Action                     | Notice                                 | Return           |
| --- | ------------ | ------ | ---------------------------- | -------------------------- | -------------------------------------- | ---------------- |
| 1   | /users       | Post   | all                          | Register user              | unique email                           | The Created User |
| 2   | /users/login | Post   | all                          | Login                      |                                        | Encrypted token  |
| 3   | /users/      | Get    | admin                        | Get all users              |                                        | Array of users   |
| 4   | /users/:id   | Get    | the registered user or admin | Get user by id             |                                        | User             |
| 5   | /users/:id   | Put    | the registered user          | Edit User                  |                                        | User             |
| 6   | /users/:id   | Patch  | the registered user          | Change "isBusiness" Status | pass {"isBusiness":true/false} in body | User             |
| 7   | /users/:id   | Delete | the registered user or admin | Delete User                |                                        | Deleted User     |
| 8   | /auth        | Get    | all                          | Register/Login with Google | Only through browser                   | encrypted token  |

##### Card Routes

| No. | URL               | METHOD | Authorization                               | Action                    | Return         |
| --- | ----------------- | ------ | ------------------------------------------- | ------------------------- | -------------- |
| 1   | /cards            | Get    | all                                         | Get all cards             | Array of cards |
| 2   | /cards/my-cards   | Get    | The registered business user                | Get user cards            | Array of cards |
| 3   | /cards/:id        | Get    | all                                         | Get card by id            | Card           |
| 4   | /cards            | Post   | The registered business user                | Create new card           | Card           |
| 5   | /cards/:id        | Put    | The registered business user                | Edit card (by id)         | Card           |
| 6   | /cards/:id        | Patch  | registered user                             | Like a Card               | Card           |
| 7   | /cards/:id        | Delete | business user who created the card or admin | Delete Card               | Deleted Card   |
| 8   | /cards/bizNum/:id | Patch  | admin                                       | ReGenerate card bizNumber | Card           |

#### Models

##### User Model/Scheme

```
{
    name: {
        first: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
        },
        middle: {
            type: String,
            minlength: 0,
            maxlength: 255,
            default: "",
        },
        last: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
        },
        _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        },
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10,
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    image: {
        url: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            minlength: 11,
            maxlength: 1024,
        },
        alt: {
            type: String,
            minlength: 6,
            maxlength: 255,
            default: "User Image",
        },
        _id: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
        },
    },
    address: {
        state: {
            type: String,
            minlength: 0,
            maxlength: 255,
            default: "",
        },
        country: {
            type: String,
            minlength: 3,
            maxlength: 255,
            required: true,
        },
        city: {
            type: String,
            minlength: 6,
            maxlength: 255,
            required: true,
        },
        street: {
            type: String,
            minlength: 3,
            maxlength: 255,
            required: true,
        },
        houseNumber: {
            type: String,
            minlength: 1,
            maxlength: 10,
            required: true,
        },
        zip: {
            type: String,
            minlength: 0,
            maxlength: 12,
            default: "",
        },
        _id: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
        },
    },
    isBusiness: {
        type: Boolean,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}
```

##### Minimum Input

```
{
    "name":{
        "first":"John",
        "last":"Doe"
    },
    "phone":"0505555555",
    "email":"john@doe.net",
    "password":"123456",
    "isBusiness":true,
    "address":{
        "state":"New York",
        "country":"USA",
        "city":"New York",
        "street":"main",
        "houseNumber":"30"
    }
}
```

1. "isAdmin" cannot be entered. It gets a default false, which can only be changed manually.
1. The password will not be saved in the DB, but encrypted with "bcrypt".
1. Various "\_id" properties are determined automatically.

##### Card Model/Scheme

```
{
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    subtitle: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10,
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    web: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 1024,
    },
    image: {
        url: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_1280.jpg",
            minlength: 11,
            maxlength: 1024,
        },
        alt: {
            type: String,
            minlength: 6,
            maxlength: 255,
            default: "Business Image",
        },
        _id: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
        },
    },
    address: {
        state: {
            type: String,
            minlength: 0,
            maxlength: 255,
            default: "",
        },
        country: {
            type: String,
            minlength: 3,
            maxlength: 255,
            required: true,
        },
        city: {
            type: String,
            minlength: 6,
            maxlength: 255,
            required: true,
        },
        street: {
            type: String,
            minlength: 3,
            maxlength: 255,
            required: true,
        },
        houseNumber: {
            type: String,
            minlength: 1,
            maxlength: 10,
            required: true,
        },
        zip: {
            type: String,
            minlength: 0,
            maxlength: 12,
            default: "",
        },

        _id: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
        },
    },
    bizNumber: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 999_999_999,
        unique: true,
    },
    likes: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId, ref: "User"
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}
```

##### Minimum Input

```
{
    "title":"My Card Title",
    "subtitle":"My Card subtitle",
    "description":"My Card description",
    "phone":"0505555555",
    "email":"card1@cards.net",
    "web":"https://business.web",
    "address":{
        "state":"New York",
        "country":"USA",
        "city":"New York",
        "street":"Main",
        "houseNumber":"30"
    }
}
```

1. "user_id" is entered automatically and references the user who created the card.
1. "bizNumber is created randomly and automatically. It is unique.
1. Various "\_id" properties are determined automatically.

### Libraries

1. "node.js" : main platform
2. "express" : managing routes and requests.
3. "mongoose" : connecting to and managing MongoDB database.
4. "joi" : validation.
5. "bcrypt" : password encryption
6. "dotenv" : injecting environment variables.
7. "config" : various configuration variables (including environment variables);
8. "jsonwebtoken" : creating user token.
9. "cors" : for handling cors.
10. "chalk" : adding color to your console.
11. "morgan" : logging requests to the console.
12. "lodash" : for easy functionality.
13. "on-finished" : used for logging functionality.
14. "nodemailer" : for managing emails.
15. "express-rate-limit" : limiting requests.
16. "multer" : handling files uploads.

### Additional Features

1. Static files are located in the "public" folder, and are served if no previous route was found.
1. The server has a logger feature, which saves request errors (status 400 and above), to dated files located in the "logs" folder.
1. The server implements a login blocker, which limits failed tries to 3, and then blocks the IP for 24 hours. The list of blocked IPs is stored locally in the "logInMW.js" middleware.

## ENJOY!!
