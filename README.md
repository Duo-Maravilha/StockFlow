# StockFlow - Inventory Management System

A backend application for managing warehouse inventory, products, suppliers, and stock movements, built with Java and Spring Boot.

StockFlow aims to help small and medium-sized businesses manage their inventory efficiently, maintain accurate stock records, and track every stock movement through a centralized REST API.

Project status: In development
Table of Contents
Overview
Features
Technology Stack
Architecture
Data Model
Getting Started
Configuration
API Endpoints
Business Rules
Testing
Project Roadmap
Future Improvements
Contributing
License
Overview

Managing inventory using spreadsheets can lead to inaccurate stock levels, duplicated records, and a lack of traceability.

StockFlow is designed to address these challenges by providing a structured inventory management system with a RESTful API, relational database, authentication, and stock movement tracking.

The project is also an opportunity to apply software engineering principles, including layered architecture, data validation, transaction management, automated testing, and API documentation.

Features
Product Management
Create, retrieve, update, and deactivate products.
Assign unique SKU codes to products.
Manage product categories.
Store purchase prices, selling prices, and minimum stock levels.
Search, filter, sort, and paginate product listings.
Supplier Management
Register and manage suppliers.
Store supplier contact information and tax identification details.
Associate stock receipts with their suppliers.
Inventory Management
Register stock entries and stock withdrawals.
Track current stock quantities.
Prevent withdrawals that exceed available inventory.
Identify products that have reached or fallen below their minimum stock levels.
Maintain a history of inventory movements.
Security and Access Control
Authenticate users.
Define administrator and warehouse employee roles.
Restrict operations according to user permissions.
Protect sensitive credentials.
Traceability
Record the date and time of stock movements.
Associate each movement with the responsible user.
Preserve inventory history for auditing and troubleshooting.
Technology Stack
Technology	Purpose
Java 21	Main programming language
Spring Boot	Application framework
Spring Web	REST API development
Spring Data JPA	Data persistence
Spring Security	Authentication and authorization
Bean Validation	Request and data validation
PostgreSQL	Relational database
Maven	Dependency and build management
JUnit 5	Automated testing
Mockito	Unit testing and mocking
Swagger / OpenAPI	API documentation
Docker	Containerization
GitHub Actions	Continuous integration

The stack represents the intended technology choices. Individual components may be introduced progressively during development.

Architecture

StockFlow follows a layered architecture to separate responsibilities and make the application easier to maintain and test.

src/main/java/
└── com/stockflow/
    ├── controller/
    ├── service/
    ├── repository/
    ├── entity/
    ├── dto/
    ├── mapper/
    ├── exception/
    ├── config/
    └── security/

Layer Responsibilities
Controller: Handles HTTP requests and returns appropriate responses.
Service: Implements business rules and coordinates transactions.
Repository: Handles database access using Spring Data JPA.
Entity: Represents persistent domain objects.
DTO: Defines the data exchanged through the API.
Mapper: Converts between entities and DTOs.
Exception: Provides consistent error handling.
Config: Contains application configuration.
Security: Handles authentication and authorization.

The package structure may evolve as the project grows.

Data Model

The initial domain model includes the following entities:

Entity	Description
Product	Product information, pricing, SKU, and stock levels
Category	Product classification
Supplier	Supplier information
StockMovement	Inventory entries and withdrawals
User	Application users and access roles
Main Relationships
A category can contain multiple products.
A supplier can be associated with multiple stock receipts.
A product can have multiple stock movements.
A user can be responsible for multiple stock movements.

Database constraints and transaction boundaries are used to protect data integrity.

Getting Started
Prerequisites

Before running the application, install:

Java 21 or a compatible supported Java LTS release.
Maven 3.9 or later.
PostgreSQL.
Git.

Docker can also be used if container configuration is available.

1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/stockflow.git
cd stockflow


Replace YOUR_USERNAME with your GitHub username and adjust the repository name if necessary.

2. Create the Database

Connect to PostgreSQL and create a database:

CREATE DATABASE stockflow;


Create a dedicated database user and grant it the necessary privileges for your environment.

3. Configure Environment Variables

Configure the following environment variables:

DB_URL=jdbc:postgresql://localhost:5432/stockflow
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password


These values should be mapped to the application's Spring configuration.

For example, in application.properties:

spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}


Never commit production credentials or other secrets to the repository.

4. Build the Application
./mvnw clean install


On Windows, use:

mvnw.cmd clean install


If the Maven Wrapper is not included, use an installed Maven version:

mvn clean install

5. Run the Application
./mvnw spring-boot:run


On Windows:

mvnw.cmd spring-boot:run


The default Spring Boot port is usually 8080, unless configured otherwise.

Note: These instructions describe the intended setup. Database configuration, environment variables, and startup commands should be verified against the implemented version of the project.

Configuration

Application settings should be managed through environment variables or external configuration.

Typical settings include:

Variable	Description
DB_URL	PostgreSQL JDBC connection URL
DB_USERNAME	Database username
DB_PASSWORD	Database password
SERVER_PORT	HTTP server port

Do not store credentials in version-controlled configuration files.

For development, use a dedicated local database and test configuration.

API Endpoints

The following endpoints define the planned REST API.

Method	Endpoint	Description
POST	/api/products	Create a product
GET	/api/products	List and search products
GET	/api/products/{id}	Retrieve a product
PUT	/api/products/{id}	Update a product
PATCH	/api/products/{id}/status	Change product status
POST	/api/stock-movements/inbound	Register a stock entry
POST	/api/stock-movements/outbound	Register a stock withdrawal
GET	/api/products/{id}/movements	Retrieve product movement history
GET	/api/products/low-stock	List products with low stock
POST	/api/auth/login	Authenticate a user

The endpoint list represents the planned API contract. Routes should be updated as implementation progresses.

API Documentation

When OpenAPI integration is configured, the interactive API documentation should be available at:

http://localhost:8080/swagger-ui/index.html

Business Rules

The application is designed around the following business rules:

Product SKU codes must be unique.
Prices cannot be negative.
Stock quantities cannot be negative.
Stock withdrawals cannot exceed available inventory.
Stock movements must be recorded with the corresponding inventory update.
Failed stock operations must not leave partially updated data.
Every stock movement must be associated with a responsible user.
Products with stock at or below the minimum threshold must be identifiable.
Historical stock movements must remain traceable.
Administrative operations must be restricted to authorized users.

These rules should be enforced on the server side and covered by automated tests.

Testing

The project aims to include unit tests and integration tests.

Unit Tests

JUnit 5 and Mockito can be used to test:

Product validation.
Stock entry and withdrawal rules.
Low-stock calculations.
Service-layer business logic.
Error handling.
Integration Tests

Integration tests should cover:

REST API behavior.
Database persistence.
Validation and error responses.
Transaction rollback.
Authentication and authorization.
Stock consistency across concurrent operations.

Run the test suite with:

./mvnw test

Project Roadmap
Initialize the Spring Boot project.
Configure PostgreSQL and database migrations.
Implement product CRUD operations.
Implement categories and suppliers.
Add request validation and centralized exception handling.
Implement stock entries and withdrawals.
Add stock movement history.
Implement low-stock queries.
Add authentication and role-based authorization.
Write unit and integration tests.
Document the API with Swagger/OpenAPI.
Add Docker and Docker Compose support.
Configure GitHub Actions for continuous integration.
Add screenshots and a demonstration.
Deploy a public demo, if an appropriate hosting environment is available.
Future Improvements

Potential future enhancements include:

Purchase order management.
Barcode scanning.
Inventory reports and analytics.
CSV import and export.
Email notifications for low stock.
Multi-warehouse support.
A frontend dashboard.
Audit logs for sensitive operations.
Advanced reporting and stock valuation.
Contributing

This project is developed as a portfolio project to practice Java, Spring Boot, REST API design, database modeling, testing, and software engineering principles.

Suggestions and constructive feedback are welcome.

To propose a change:

Fork the repository.
Create a feature branch.
Implement the change and add tests.
Open a pull request describing the change.
License

A license has not yet been selected.

Before publishing the project for reuse, choose an appropriate open-source license and add the corresponding LICENSE file.

StockFlow — Building reliable inventory management software with Java and Spring Boot.
