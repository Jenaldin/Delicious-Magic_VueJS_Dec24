# Delicious Magic by Jenny Guteva
Delicious Magic is initially designed as a VueJS Exam Project for SoftUni's December 2025 examination session. However, with the author's evolving commitments and availability, it holds the potential to grow, having additional features in the future (such as admin panel and functionality, recipe search, upload of images, in-app user communication, better UI and design, etc.). As it is, this is MVP version 1.0.

By its nature, Delicious Magic is a blog-type web app, that provides end users a catalog of recipes with ingredients and steps, and if they are logged in - the opportunity to interact with the recipes. It is a simple representation of a popular idea and it is intended to be used by people for whom cooking/mixing is an enjoyable hobby or are in search of a simple recipe to bring to the table. What differs from most similar apps is the addition of recipes for drinks, not only for food.

Currently Delicious Magic is not deployed publicly, but if this changes, the link will be shared here.

## Project Overview
The App is currently in the development phase, with no production options included. It utilizes MongoDB as its database (mongodb://127.0.0.1:27017/).
Frontend operates on http://localhost:5173 and incorporates : | Backend runs on http://localhost:3000/ and employs:
---------------------------------------------------------------|----------------------------------------------------
VueJS 3 (with Vite), Vuelidate, Vue Router, Axios, Pinia, Vuetify (UI), MDI as CDN | Express, Mongoose, BCrypt, Cookie-parser, JWT
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
   - View the home, about, all recipes catalog, login/register pages;
   - View the details page of a recipe from the catalog, user owned recipes and user favorites recipes;
   - View the comments panel of a recipe from the recipe details page;
   - View a user'a page, when clicking on a username, and their profile, recipes owned, recipes favorites;
   - If you attempt to access a non-existent location, you will be redirected to /not-found page;
   - If you try to access a page for which you lack authorization, you will be redirected to /not-found page or login/register page depending on the case;
- As an ***authenticated user***, you can:
   - View the home, about, all recipes catalog, add recipe, my cookbook & recipes pages and the option to logout;
   - View the details page of a recipe from the catalog, user owned recipes and user favorites recipes;
   - If you're not the owner of a recipe, provide rating for it from its details page;
   - If you're not the owner of a recipe, add it to your favorites recipes from its details page;
   - Add a new recipe from the add recipe page;
   - If you’re the owner of a recipe, edit or delete it from its details page;
   - View the comments panel of a recipe from its details page;
   - Add a new comment to a recipe from the comments panel of its details page;
   - If you’re the owner of a comment, edit or delete it from the comments panel of the recipe details page;
   - View a user's page, when clicking on a username, and their profile, recipes owned, recipes favorites;
   - If it is your user page (My Cookbook & Recipes), edit your e-mail, avatar and "about me" information, view/edit/delete recipes you own, view recipes you favour;
   - If you attempt to access a non-existent location, you will be redirected to /not-found page;
   - If you try to access a page for which you lack authorization, you will be redirected to /not-found page;

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
/user/logout | GET | Logs out an existing user | :heavy_check_mark: | :heavy_check_mark: | **-**
/user/:userId | GET | Retrieves a user item | :heavy_check_mark: | :heavy_check_mark: | **-**
/user/addFav | PUT | Adds a recipe item to a user item collection | :x: | :heavy_check_mark: | **-**
/user/edit/:userId | PUT | Updates/Edits details of a user item | :x: | **-** | :heavy_check_mark:
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/comment/:recipeId | GET | Retrieves all comment items associated with a recipe item | :heavy_check_mark: | :heavy_check_mark: | **-**
/comment/:commentId | GET | Retrieves a comment item | :heavy_check_mark: | :heavy_check_mark: | **-**
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