Link to deployed app: https://cvwo-forum.vercel.app/



## **Name:** 
Timothy Lo



## **Description:**

This is a monorepo forum website I built for the NUS CVWO winter assignment submission. You can create, read, update and delete posts. 

There is account-based authentication, user profile creation and users are able to view and comment on other user's posts. 

This web application has its frontend written in Next.js and Typescript, and it is hosted on Vercel. The backend is written in Golang using the GORM ORM and Fiber, and is hosted using fly.io. 



## **Setup Instructions:**

Prerequisites:
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
   
`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = ************* (From clerk)

CLERK_SECRET_KEY = ******************* (From clerk)

NEXT_PUBLIC_API_BASE_URL= **************** (see the port run by the backend)`

6. If an error occurs, run `npm install --legacy-peer-deps`. This error may occur due to NextJs Version 15 being newly released.
7. Return to the home directory and navigate to the backend folder using _cd backend_

9. Run `go mod tidy` to install the backend dependencies at one go, or if an error occurs run it one by one ->
    
`go get "gorm.io/driver/sqlite"

go get "gorm.io/gorm"

go get "github.com/gofiber/fiber/v2"

go install github.com/air-verse/air@latest

air init`



### Running App Steps:
1. Navigate to the backend folder

2. To run the backend, run `air` for persistent, constant updating of backend data. Or, you can run `go run main.go` for static data.
   
3. If the "Binary was compiled with 'CGO_ENABLED=0', go-sqlite3 requires cgo to work" error occurs when running, make sure you have a C compiler as stated above in the prerequisites.
   
4. Navigate to the frontend folder
   
5. To run the frontend, run `npm run dev` to run the frontend NextJs Application.





