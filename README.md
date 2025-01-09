# Delicious Magic by Jenny Guteva
My VueJS project for SoftUni course exam December 2024

## Project Overview
The App is currently in the development phase, with no production options included. It utilizes MongoDB as its database (mongodb://127.0.0.1:27017/).
Frontend operates on http://localhost:5173 and incorporates : | Backend runs on http://localhost:3000/ and employs:
---------------------------------------------------------------|----------------------------------------------------
VueJS 3 (with Vite), Vuelidate, Vue-Router, Axios, Pinia | Express, Mongoose, BCrypt, Cookie-parser, JWT
Vuetify (UI), MDI as CDN |  
(For more details, please refer to ```/client/package.json```) | (For more details, please refer to ```/server/package.json```)

## Installation Guide
### Prerequisites
- Node.js
- MongoDB

### Setup Instructions
1. Download or clone the repository.
The application uses ‘concurrently’.

<<***Option 1***>>

2. Run `npm run magic` to install all dependencies and start the client and server.

<<***Option 2***>>

Run install and start separately with ‘concurrently’.

2. Run `npm run install-all` to install all the necessary dependencies from `package.json` files for the project (root, server & client). 
3. Run `npm run start-all` to start both the frontend and backend simultaneously.

<<***Option 3***>>

Skip ‘concurrently’ altogether and do separate install and start/run for the /server and /client

2. Run `npm install` in /server for the backend and then in the /client for the frontend. 
3. Run separately `npm start` in /server for the backend and `npm run dev` in /client for the frontend.

## Usage
### From an End User Perspective
- As a ***guest user***, you can:
   - Access the home, catalog, search, about, login, and register pages;
   - View the details page of a book from the home, catalog, and search pages;
   - If you attempt to access a non-existent location, you will be redirected to /404;
   - If you try to access a page for which you lack authorization, 
- As an ***authenticated user***, you can:
   - Access the home, catalog, search, about, and profile pages, and have the option to logout;
   - View the details page of a book from the home, catalog, and search pages;

### REST API Endpoints
Base URL is http://localhost:3000/api.
***Note:*** In the table below, “Ownership” indicates that the user is already logged in. Therefore, where “Ownership” is required, “Logged in” is marked with **-** and vice versa (if “Logged in” is required, but “Ownership” is not, the latter is marked with **-**).

Endpoint | HTTP Method | Description | Accessible to Guests (Y/N)? | Accessible when Logged in (Y/N)? | Requires Item Ownership (Y/N)?
---------|:-----------:|-------------|:---------------------------:|:--------------------------------:|:----------------------------:
/catalog | GET | Retrieves all recipe items | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/:recipeId | GET | Retrieves details of a recipe item | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/add | POST | Creates a new recipe item | :x: | :heavy_check_mark: | **-**
/catalog/rate/:recipeId | PUT | Rates a recipe item | :x: | :heavy_check_mark: | **-**
/catalog/edit/:recipeId | PUT | Updates/Edits details of a recipe item | :x: | **-** | :heavy_check_mark:
/catalog/delete/:recipeId | DELETE | Deletes a recipe item | :x: | **-** | :heavy_check_mark:
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/user/register | POST | Creates a new user item | :heavy_check_mark: | :x: | **-**
/user/login | POST | Logs in as an existing user | :heavy_check_mark: | :x: | **-**
/user/logout | GET | Logs out an existing user | :x: | :heavy_check_mark: | **-**
/user/:userId | GET | Retrieves a user item | :x: | :heavy_check_mark: | **-**
/user/addFav | PUT | Adds a recipe item to a user item collection | :x: | :heavy_check_mark: | **-**
/user/edit/:userId | PUT | Updates/Edits details of a user item | :x: | **-** | :heavy_check_mark:
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/comment/:recipeId | GET | Retrieves all comment items associated with a recipe item | :heavy_check_mark: | :x: | **-**
/comment/:commentId | GET | Retrieves a comment item | :heavy_check_mark: | :x: | **-**
/comment/add | POST | Creates a new comment item | :x: | :heavy_check_mark: | **-**
/comment/edit/:commentId | PATCH | Updates/Edits the content of a comment item | :x: | **-** | :heavy_check_mark:
/comment/delete/:commentId | DELETE | Deletes a comment item | :x: | **-** | :heavy_check_mark:

### Project structure
Here is an overview of the project's structure with folders and files:
- client
  - public
    - avatar-img.png
    - bckgr.png
    - fav-large.png
    - recipe-img.png
  - src
    - api
      - authUserApi.js
      - commentApi.js
      - recipeApi.js
    - assets
      - main.css
    - components
      - AllRecipes.vue
      - EditRecipe.vue
      - FavoriteRecipes.vue
      - Footer.vue
      - Loader.vue
      - Login.vue
      - Navigation.vue
      - NewComment.vue
      - NewRecipe.vue
      - OwnedRecipes.vue
      - Profile.vue
      - Register.vue
      - ViewComment.vue
      - ViewRecipe.vue
    - pages
      - AboutPage.vue
      - CatalogPage.vue
      - CommentPage.vue
      - DetailsPage.vue
      - EntryPage.vue
      - HomePage.vue
      - NotFoundPage.vue
      - UserPage.vue
    - router
      - index.js
    - stores
      - authStore.js
      - catalogStore.js
      - index.js
      - loadingStore.js
    - utils
      - formatDates.js
    - App.vue
    - axios.js
    - main.js
  - index.html
- server
  - controllers
    - authController.js
    - commentController.js
    - recipeController.js
  - middlewares
    - authMiddleware.js
    - errorHandlerMiddleware.js
    - ownerMiddleware.js
  - models
    - commentModel.js
    - recipeModel.js
    - userModel.js
  - routes
    - authRoute.js
    - commentRoute.js
    - index.js
    - recipeRoute.js
  - services
    - authService.js
    - commentService.js
    - recipeService.js
  - utils
    - jwt.js
    - tkn.js
  - router.js
  - server.js