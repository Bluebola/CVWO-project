package database // Declares the package name, similar to 'export default' in JavaScript

import (
	"log" // Imports the log package for logging, similar to 'import log from "log"'
	"os"  // Imports the os package for operating system functionality, similar to 'import os from "os"'

	"github.com/Bluebola/CVWO-project/backend-test/models"
	"gorm.io/driver/sqlite" // Imports the SQLite driver for GORM, similar to 'import sqlite from "sqlite"'
	"gorm.io/gorm"          // Imports the GORM package, similar to 'import { Sequelize } from "sequelize"'
	"gorm.io/gorm/logger"   // Imports the GORM logger, similar to 'import logger from "sequelize/lib/utils/logger"'
)

type DbInstance struct {
	Db *gorm.DB // Defines a struct with a single field Db of type *gorm.DB, similar to 'const dbInstance = { db: new Sequelize() }'
}

var Database DbInstance // Declares a global variable Database of type DbInstance, similar to 'let database = dbInstance'

func ConnectDb() { // Defines a function ConnectDb, similar to 'function connectDb() {'
	db, err := gorm.Open(sqlite.Open("api.db"), &gorm.Config{}) // Opens a SQLite database connection, similar to 'const db = new Sequelize("sqlite:api.db")'

	if err != nil { // Checks if there was an error opening the database, similar to 'if (err) {'
		log.Fatal("Failed to connect to the database! \n", err) // Logs the error and exits, similar to 'console.error("Failed to connect to the database!", err); process.exit(2);'
		os.Exit(2)                                              // Exits the program with status code 2, similar to 'process.exit(2)'
	}

	log.Println("Connected Successfully to Database") // Logs a success message, similar to 'console.log("Connected Successfully to Database")'
	db.Logger = logger.Default.LogMode(logger.Info)   // Sets the logging mode to Info, similar to 'db.options.logging = console.log'
	log.Println("Running Migrations")                 // Logs a message indicating that migrations are running, similar to 'console.log("Running Migrations")'

	// Note: Migration code would go here, similar to 'db.sync()' in Sequelize
	db.AutoMigrate(&models.User{}, &models.Product{}, &models.Order{})

	Database = DbInstance{
		Db: db,
	}
}

// Summary
// Running AutoMigrate Every Time: Ensures the schema is always up-to-date but may introduce some overhead.
// Data Safety: AutoMigrate is designed to be safe for existing data, adding new columns without affecting existing data.
// Best Practices: For production environments, consider using dedicated migration tools or scripts to handle complex schema changes and ensure data integrity.
