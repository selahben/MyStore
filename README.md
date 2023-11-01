# MyStore

A very good start to a fully functional e-commerce store.
It uses React.js for developing the Frontend, and Node.js for developing the Backend.
It uses MongoDB as a database.

## Table of Contents

1. [Essential steps and requirements](#essential-steps-for-successfully-running-the-project)
1. [Client Side](#client-side)
   1. [Description](#client-description)
   1. [Install](#client-install)
   1. [Client Roles and Abilities](#client-roles-and-abilities)
      1. [Un-Registered User](#un-registered-user)
      1. [Registered User](#registered-user)
      1. [Admin](#admin)
   1. [Components](#components)
      1. [General Components](#general-components)
      1. [Product Components](#product-components)
      1. [Common Components](#common-components)
      1. [Forms Components](#forms-components)
      1. [Admin Components](#admin-components)
      1. [Other Components](#other-components)
   1. [Client General Information](#client-general-information)
   1. [Client Additional Functionality](#client-additional-functionality)
   1. [Client Libraries](#client-libraries)
1. [Server Side](#server-side)
   1. [Description](#server-description)
   1. [Install](#server-install)
   1. [Seeding the DB](#seeding-the-db)
   1. [Routes and Models](#routes-and-models)
      1. [User](#user)
         1. [User Routes](#user-routes)
         1. [User Model/Schema](#user-modelscheme)
         1. [User Minimum Input (Creation / Editing)](#user-minimum-input)
      1. [Product](#product)
         1. [Product Routes](#product-routes)
         1. [Product Model/Schema](#product-modelscheme)
         1. [Product Minimum Input (Creation / Editing)](#product-minimum-input)
      1. [Category](#category)
         1. [Category Routes](#category-routes)
         1. [Category Model/Schema](#category-modelscheme)
         1. [Category Minimum Input (Creation / Editing)](#category-minimum-input)
   1. [Libraries](#server-libraries)
   1. [Additional Features](#server-additional-features)

## Essential Steps for successfully running the project

- Installing node.js version 18.16.1 globally (for determining installation and version, you can run "node -v" in the console)
- Installing MongoDB
- Downloading both "frontStore" and "backStore" folders.
- Installing all the necessary libraries (see the "Install" sub-section in both client and server sections).
- Creating the .env file according to the .env.example file.
- Running the seeder on the back-end. (see [Seeding the DB](#seeding-the-db) for further information).

## Client Side

### Client Description

The Client side of an online Store.
It includes various user, products and categories management features.
It was built with React (create-react-app).
It uses Bootstrap and Bootstrap icons for general structure and basic responsiveness.

### Client Install

1. Download the project.
1. In the client folder (/storeFront) do

```
npm i
```

to install all the required libraries.

3. After installing all required libraries you can do:

```
npm run start
```

### Client Roles and Abilities

#### Un-Registered User

![Un-Registered User](https://drive.google.com/uc?export=view&id=1EFBYwc2tqkoZo42idw_dEtabHQzGDzpK)

Un-Registered Users Can:

- View the products, sort them and search.
- Sign in.
- Sign up.
- Use "Forgot Password" (from the sign in).

#### Registered User

![Registered User](https://drive.google.com/uc?export=view&id=1-mqbHnqNaMPp5k8xdxS_Pm0GvJjFk9gx)

Registered Users Can:

- View the products, sort them and search.
- Add/Remove/Edit their cart.
- Sign out (from the user menu).
- Edit their profile (from the user menu).

#### Admin

![Admin Main](https://drive.google.com/uc?export=view&id=1gbhl9mXEfXJgSOfDElEEYU5ZcB9IqO6Q)
![Admin Panel](https://drive.google.com/uc?export=view&id=1jVr1i32ANCswY4e6X_NROalNKFCbFNf7)

Admins Can:

- View the products, sort them and search.
- Add/Remove/Edit their cart.
- Sign out (from the user menu).
- Edit their profile (from the user menu).
- Add/Edit/Delete products (main/products page).
- Get access to the admin panel (from the user menu), where they can:
  - Sort Users by various terms (users tag).
  - Edit/Delete users (users tag).
  - Switch a users status between Admin and Registered User (users tag).
  - Sort the products by various terms (products tag).
  - Add/Edit/Delete products (products tag).
  - Sort the categories by various terms (categories tag).
  - Add/Edit/Delete categories (categories tag).

### Components

#### General Components

General Components are located in "components/general and consist of:

- about: about page.
- adminPanel: admin panel page.
- alternativeMenu: the menu which is shown in all pages except for the main page.
- footer: the footer.
- header: the header.
- mainMenu: the menu of the main page.
- signIn: sign in button.
- signUp: sign up button.
- signOut: sign out button.
- socialLinks: social links.

#### Product Components

General Components are located in "components/products and consist of:

- cart: the cart.
- cartProduct: single product in cart.
- main: main section in home page.
- product: single product in the main/products view.
- productQuickview: single product quick view.
- products: all products.

#### Common Components

Common Components are located in "components/common" and consist of:

- fileInput: user avatar image upload.
- imageSearch: product image search from pixabay.
- input: text input.
- modal: modal component used to show forms and product quick view.
- protectedRoute: used to protect Admin routes.
- select: select input.

#### Forms Components

- Forms Components are located in "components/forms", and are delivered through the modal components (except for the "reset-password" form).
- All Forms are built with Formik, and validated using Joi.

#### Admin Components

Admin Components are located in "components/admin" and consist of:

- categoriesTable: categories table.
- categoriesTableColTitle: categories table titles row.
- categoriesTableRow: categories table info row.
- productsTable: products table.
- productsTableColTitle: products table titles row.
- productsTableRow: products table info row.
- usersTable: users table.
- usersTableColTitle: users table titles row.
- usersTableRow: users table info row.

#### Other Components

Located in the "components" and consist of:

- appLogout: an envelope component which deals with auto logout due to inactivity.
- mainAlerts: deals with general errors.
- store: the main component.

### Client General Information

- Most functions share states and are calling each other, and therefor they are located in the context component (components/context/store.context.jsx).
- Http services (general, users, products, cart, categories) functions are located in the "services" folder.
- Css files are located in "public/css".

### Client Additional Functionality

- Forgot Password:
  - Located in the "sign in" modal/popup.
  - Sending email with a link to reset password (see server additional functionality for more info).
- User is signed out automatically after 4 hours of inactivity.

### Client Libraries

- "@babel/plugin-proposal-private-property-in-object": react library,
- "@testing-library/jest-dom": react library,
- "@testing-library/react": react library,
- "@testing-library/user-event": react library,
- "axios": http requests,
- "bootstrap": general structure,
- "bootstrap-icons": icons,
- "formik": forms,
- "joi": validation,
- "react": main library,
- "react-dom": react library,
- "react-router-dom": routing,
- "react-scripts": react library,
- "react-toastify": alert messages,
- "web-vitals": react library

## Server Side

### Server Description

The server side for managing an online Store.
It includes various user, products and categories management features.
It was built with node.js.

### Server Install

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

- IMPORTANT! mongoDB is used as the database. You MUST installed it locally or have an Atlas DB account.

### Seeding the DB

For seeding the DB with 11 products, 5 categories and 2 users (regular,admin) and their carts.

```
npm run seed-db
```

1. The seeding process is HIGHLY RECOMMENDED! Without it there will be no categories and no Admin user.
1. The seeding process empties all collections (products,categories,users) before inserting the data.
1. The seeded data can be changed in scripts->dbSeederData.

### Routes and Models

#### User

##### User Routes

- Create New User / Sign Up

  - Route: /users
  - Method: POST
  - Body: New User ([See User Model](#user-modelscheme) / [User Minimum Input](#user-minimum-input))
  - Authorization: All
  - Return on Success: New User ([See User Model](#user-modelscheme))
  - Comments: "isAdmin" cannot be entered

- Login / Sign In

  - Route: /users/login
  - Method: POST
  - Body:
    ```
    {
      "email":"{valid email}",
      "password:"{valid password}"
    }
    ```
  - Authorization: All
  - Return on Success: json web token
  - Comments: valid password must contain, at least, 1 uppercase letter, 1 lowercase letter, 4 digits, 1 special character (!@#$%^&), and be, at least, 8 characters long. "createdAt" and "updatedAt" are created automatically.

- Forgot Password

  - Route: /users/forgot-password
  - Method: POST
  - Body:
    ```
    {
      "email":"{valid existing email}",
    }
    ```
  - Authorization: All
  - Return on Success: Send an email to the user with a link to "Reset Password" page with a temporary token.
  - Comments: Email Service MUST BE CONFIGURED!

- Reset Password

  - Route: /users/reset-password
  - Method: POST
  - Required Headers:
    ```
    "x-auth-token":"{temporary json web token received from previous step}"
    ```
  - Body:
    ```
    {
      "password":"{valid password}",
    }
    ```
  - Authorization: Registered User
  - Return on Success: "Success".
  - Comments: valid password must contain, at least, 1 uppercase letter, 1 lowercase letter, 4 digits, 1 special character (!@#$%^&), and be, at least, 8 characters long.

- Get Users

  - Route: /users[?sortBy=(name/email/phone/state/country/city)&sortOrder=(asc/desc)]
  - Method: GET
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Admin
  - Return on Success: Array of Users.
  - Comments: If no params are passed, users will be sorted by name in ascending order.

- Get Logged-In User / Me

  - Route: /users/me
  - Method: GET
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Current User
  - Return on Success: The User ([See User Model](#user-modelscheme)).

- Get Logged-In User Cart

  - Route: /users/cart
  - Method: GET
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Current User
  - Return on Success: User Cart ([See User Model](#user-modelscheme) for cart structure).

- Get User by Id

  - Route: /users/:{id}
  - Method: GET
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Admin
  - Return on Success: User ([See User Model](#user-modelscheme)).

- Upload User Avatar

  - Route: /users/upload/:{id}
  - Method: PUT
  - Body:
    ```
    {
      "avatar":{file/image object},
    }
    ```
  - Required Headers:
    ```
    "x-auth-token":"{json web token}",
    "Content-Type":"multipart/form-data"
    ```
  - Authorization: Current User / Admin
  - Return on Success: User ([See User Model](#user-modelscheme)).

- Edit User

  - Route: /users/:{id}
  - Method: PUT
  - Body: User ([See User Model](#user-modelscheme) / [User Minimum Input](#user-minimum-input))
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Current User / Admin
  - Return on Success: User ([See User Model](#user-modelscheme))
  - Comments: "isAdmin" cannot be entered

- Change Admin Status ("isAdmin" field)

  - Route: /users/isAdmin/:{id}
  - Method: PATCH
  - Body:
    ```
    {
      "isAdmin":true/false,
    }
    ```
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Admin
  - Return on Success: User ([See User Model](#user-modelscheme))
  - Comments: User cannot change his own status ; There must be, at least, 1 admin.

- Delete User

  - Route: /users/:{id}
  - Method: DELETE
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Current User / Admin
  - Return on Success: Deleted User ([See User Model](#user-modelscheme))
  - Comments: An only admin will not be deleted.

- Update Cart (Add/Edit/Delete)

  - Route: /users/cart
  - Method: PATCH
  - Body:
    ```
    {
      "product_id":"{valid product id}",
      "amount":{some number}
    }
    ```
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Current User
  - Return on Success: User ([See User Model](#user-modelscheme))
  - Comments: "amount"<=0 will cause the product to be deleted from the cart.

##### User Model/Scheme

```
{
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 12,
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
      minlength: 8,
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
    },
    imageFile: {
      type: String,
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
        minlength: 0,
        maxlength: 255,
        default: "",
      },
      city: {
        type: String,
        minlength: 0,
        maxlength: 255,
        default: "",
      },
      street: {
        type: String,
        minlength: 0,
        maxlength: 255,
        default: "",
      },
      houseNumber: {
        type: String,
        minlength: 0,
        maxlength: 10,
        default: "",
      },
      zip: {
        type: String,
        minlength: 0,
        maxlength: 12,
        default: "",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        amount: {
          type: Number,
          min: 0,
        },
      },
    ],
  }
```

##### User Minimum Input

```
{
    "name":"John Doe",
    "email":"john@doe.net",
    "password":"123456",
}
```

- "isAdmin" cannot be entered. It gets a default false, which can only be changed by the Admin.
- Valid "password" must contain, at least, 1 uppercase letter, 1 lowercase letter, 4 digits, 1 special character (!@#$%^&), and be, at least, 8 characters long.
- The password will not be saved in the DB, but encrypted with "bcrypt".
- Valid "phone" must be between 10 and 12 digits long, and may contain "+" at the start.
- Various "\_id" properties are determined automatically.

#### Product

##### Product Routes

- Get Products

  - Route: /products[?sortBy=(sn/name/price/cat)&sortOrder=(asc/desc)&search=(string of words separated by spaces)]
  - Method: GET
  - Authorization: All
  - Return on Success: Array of Products.
  - Comments: If no params are passed, products will be sorted by name in ascending order. The search is done on the "tags" field. "sort" and "search" are not done together.

- Get Product by Id

  - Route: /products/:{id}
  - Method: GET
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Registered User / Admin
  - Return on Success: Product ([See Product Model](#product-modelscheme)).

- Create New Product

  - Route: /products
  - Method: POST
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Body: Product ([See Product Model](#product-modelscheme) / [Product Minimum Input](#product-minimum-input))
  - Authorization: Admin
  - Return on Success: New Product ([See Product Model](#product-modelscheme))
  - Comments: "createdAt" and "updatedAt" are created automatically.

- Edit Product

  - Route: /products/:{id}
  - Method: PUT
  - Body: Product ([See Product Model](#product-modelscheme) / [Product Minimum Input](#product-minimum-input))
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Admin
  - Return on Success: Product ([See Product Model](#product-modelscheme))

- Delete Product

  - Route: /products/:{id}
  - Method: DELETE
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Admin
  - Return on Success: Deleted Product ([See Product Model](#product-modelscheme))

##### Product Model/Scheme

```
{
    name: {
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
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["KG", "Units"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    image: {
      url: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2016/03/23/19/38/shopping-carts-1275480_1280.jpg",
        minlength: 11,
        maxlength: 1024,
      },
      alt: {
        type: String,
        minlength: 2,
        maxlength: 255,
        default: "shopping carts",
      },
    },
    sn: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 999_999_999,
      unique: true,
    },
    nutritionVals: {
      type: String,
      minlength: 0,
      maxlength: 1024,
      default: "",
    },
    ingredients: {
      type: String,
      minlength: 0,
      maxlength: 1024,
      default: "",
    },
    tags: {
      type: String,
      default: "",
    },
  }
```

##### Product Minimum Input

```
{
    "sn": "{unique string}",
    "name": "{string of words and spaces}",
    "description": "{string}",
    "price": {number},
    "unit": "{KG/Units}",
    "category": "{title of existing category}",
    "tags": "{string of words. may contain spaces and commas}"
}
```

#### Category

##### Category Routes

- Get Categories

  - Route: /categories[?sortBy=(title/className)&sortOrder=(asc/desc)]
  - Method: GET
  - Authorization: All
  - Return on Success: Array of Categories.
  - Comments: If no params are passed, categories will be sorted by title in ascending order.

- Get Category by Id

  - Route: /categories/:{id}
  - Method: GET
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Admin
  - Return on Success: Category ([See Category Model](#category-modelscheme)).

- Create New Category

  - Route: /categories
  - Method: POST
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Body: Category ([See Category Model](#category-modelscheme) / [Category Minimum Input](#category-minimum-input))
  - Authorization: Admin
  - Return on Success: New Category ([See Category Model](#category-modelscheme))
  - Comments: "createdAt" and "updatedAt" are created automatically. "main" cannot be entered.

- Edit Category

  - Route: /categories/:{id}
  - Method: PUT
  - Body: Category ([See Category Model](#category-modelscheme) / [Category Minimum Input](#category-minimum-input))
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Admin
  - Return on Success: Category ([See Category Model](#category-modelscheme))

- Delete Category

  - Route: /categories/:{id}
  - Method: DELETE
  - Required Headers:
    ```
    "x-auth-token":"{json web token}"
    ```
  - Authorization: Admin
  - Return on Success: Deleted Category ([See Category Model](#category-modelscheme))
  - Comments: "main" Category cannot be deleted, only edited.

##### Category Model/Scheme

```
{
  className: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
    unique: true,
  },
  main: {
    type: Boolean,
    default: false,
  },
}
```

##### Category Minimum Input

```
{
    "title": "{unique string. May contain spaces}",
    "className": "{unique string. May NOT contain spaces}"
}
```

- "main" category is determined on seeding and can only be edited.
- There can be only 1 "main" Category.

### Server Libraries

- "bcrypt" : password encryption
- "chalk" : adding color to your console.
- "config" : various configuration variables (including environment variables);
- "cors" : for handling cors.
- "dotenv" : injecting environment variables.
- "express" : managing routes and requests.
- "express-rate-limit" : limiting requests.
- "joi" : validation.
- "jsonwebtoken" : creating user token.
- "lodash" : for easy functionality.
- "mongoose" : connecting to and managing MongoDB database.
- "morgan" : logging requests to the console.
- "multer" : handling files uploads.
- "nodemailer" : for managing emails.
- "on-finished" : used for logging functionality.

### Server Additional Features

- Static files are located in the "public" folder, and are served if no previous route was found.
- Images are saved in "public/uploads".
- The server has a logger feature, which saves request errors (status 400 and above), to dated files located in the "logs" folder.
- The server implements a login blocker, which limits failed tries to 3, and then blocks the IP for 24 hours. The list of blocked IPs is stored locally in the "logInMW.js" middleware.
- The server limits requests to 1000/24 Hours. These configurations can be found in the "limiterMW" middleware.
- The server uses the "nodemailer" library to send emails. To work properly, the library params should be configured in the .env file.
- The server has a "Forgot Password" functionality. It generates a temporary token (json web token), which is valid for 5 minutes, and sends the user an email with a link to "Reset Password" Page with the token as a param.

## Final Notes:

There is no doubt that this project can be further developed and improved (and maybe it will). If you wish to do so - be my guest 😊

## ENJOY!!
