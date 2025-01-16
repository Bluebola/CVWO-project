Link to deployed app: https://cvwo-forum.vercel.app/


User Manual & Final Writeup: https://docs.google.com/document/d/e/2PACX-1vT7t_kwtZGljUF8AVH9BD1eVJQq1GY7NiSi3Q0sPOqbZDTimg7CmwS4yH-xICpVtYxRrnXyJ3OERNJF/pub


## **Name:** 
Timothy Lo



## **Description:**

This is a mobile-friendly forum website I built for the NUS CVWO winter assignment submission. You can create, read, update and delete posts. 

There is account-based authentication, user profile creation and users are able to view and comment on other user's posts. 

This web application has its frontend written in Next.js and Typescript, and it is hosted on Vercel. The backend is written in Golang using the GORM ORM and Fiber, and is hosted on fly.io. 



## **Setup Instructions:**

### Prerequisites:

Please ensure you have Go installed on your machine, as well as Node JS to use npm. 

The backend of this application uses SQLite in a local database file, hence please install SQLite as well and add it to your computer's PATH. You can use this link:

https://www.sqlite.org/download.html - download the sqlite-tools-win-x64-3480000.zip bundle file for Windows users.

If you do not already have a C Compiler, please go to this link to install: https://code.visualstudio.com/docs/cpp/config-mingw#_prerequisites

If you are unsure of how to download it, you can follow this very helpful video: https://www.youtube.com/watch?v=oC69vlWofJQ

As this application uses clerk auth, please create a Clerk account to get your own API Keys.



### Setup Steps:
1. Navigate to your desired folder
   
2. Clone the repo using _https://github.com/Bluebola/CVWO-project.git_
   
3. Navigate to the frontend folder using `cd cvwo-frontend`
   
4. Run `npm install` to install the dependencies
   
5. Add a .env.local file to the cvwo-frontend folder. Include your:
   
`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = *************` (From clerk)

`CLERK_SECRET_KEY = ******************* `(From clerk)

`NEXT_PUBLIC_API_BASE_URL= **************** `(see the port run by the backend)

6. If an error occurs, run `npm install --legacy-peer-deps`. This error may occur due to NextJs Version 15 being newly released.
7. Return to the home directory and navigate to the backend folder using _cd backend_

9. Run `go mod tidy` to install the backend dependencies at one go, or if an error occurs run it one by one via these commands ->
    
`go get "gorm.io/driver/sqlite"`

`go get "gorm.io/gorm"`

`go get "github.com/gofiber/fiber/v2"`

`go install github.com/air-verse/air@latest`

`air init`



### Running App Steps:
1. Navigate to the backend folder

2. To run the backend, run `air` for persistent, constant updating of backend data. Or, you can run `go run main.go` for static data.
   
3. If the "Binary was compiled with 'CGO_ENABLED=0', go-sqlite3 requires cgo to work" error occurs when running, make sure you have a C compiler as stated above in the prerequisites.
   
4. Navigate to the frontend folder
   
5. To run the frontend, run `npm run dev` to run the frontend NextJs Application.



## User Manual


### Getting Started:


After clicking on the link (https://cvwo-forum.vercel.app) or following the user guide included in the github README to start the project locally, users would be brought to the home page where they can see different posts made by different users. This web-app is also made to be mobile-friendly.



### Sign up / Sign in:

I used NextJs middleware to ensure that users who have not signed in would not be able to access any other pages in the web app until they have signed in. If they do navigate to another page via the browser search bar, they would automatically be routed to a clerk sign in page. Users can sign in and register via Google or Github, and once done they would be directed to a clerk user management page.
Click the grey ‘cvwo-forum’ text on the upper left corner to progress to the home page.



### Navbar:

Users can press the red button with the house icon on the top left to navigate to the home page. Users can toggle between light mode and dark mode using the toggle button on the top right. There is also a link dropdown button which can be used to navigate the forum’s different pages. If users have not signed in through Clerk, they would only see the login and register links. If they have signed in, the rest of the links would be available for them to select.



### Profile:


Users are required to have a profile before they can create, edit and comment on posts. If users have not created a profile, they can create one at the user/profile/create page. Trying to create posts while not having a profile would cause the user to be redirected to the create profile page. If their profile has been created, navigating to the same profile page would only let them update their profile.



### Home page:


At the home page, users can use the category select component on the top right to filter the posts via each post’s category. Only posts with the same category that was chosen will be displayed. Each post’s card component has a title which is a clickable link. If the post was made by the user themself, they would be able to edit and delete the post. If the post was made by someone else, they would not be able to do so.



### Your Posts:


At the Your Posts page, users can view, edit and delete all the different posts they created.



### Create a Post:

Users can create a post by entering their desired post title and content and then post it by clicking the Create Post button. If creation was successful, a pop-up would appear on the bottom right telling the user that it was successful.



### Comments:


To comment and view other comments on a post, click on a post’s title. Users can comment on posts by clicking on the ‘Create Comment’ button which would bring them to a comment creation page. If a comment is made by the user themselves, they can delete their own comment. If the comment was made by someone else, the option to delete would not be there.







