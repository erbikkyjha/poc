Booking Management Application

Overview

This is a Booking Management API that allows for creating, retrieving, and deleting booking records. The application uses Node.js with Express for the backend and Sequelize with PostgreSQL for the database.

Features
  . Create bookings
  . Retrieve all bookings
  . Retrieve a specific booking by ID
  . Filter bookings by date or vendor
  .Delete bookings

Prerequisites
Ensure the following are installed on your machine:
       . Node.js (v14 or later)
       .PostgreSQL (v12 or later)
       .npm (comes with Node.js)

Setup Instructions

1. Clone the Repository
    git clone <repository_url>
    cd <repository_folder>

2. Install Dependencies
   npm install

3. Configure Environment Variables
    Create a .env file in the root directory and add the following configurations:

   DB_USERNAME=postgres
   DB_PASSWORD=buzzwork1
   DB_NAME=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_DIALECT=postgres
   DB_LOGGING=false

4. Start the PostgreSQL Database
   Ensure that PostgreSQL is running on your machine and the credentials match those specified in the .env file.

5. Sync Database and Start the Server
    The application will automatically sync the database when started. Run:
    node app.js

6. Verify API Endpoints

Use a tool like Postman or cURL to interact with the API endpoints.

API Endpoints

1. Create a Booking

POST /bookings

Request Body:

{
  "customer_name": "bikky",
  "booking_date": "2025-01-01",
  "amount": 200,
  "vendor_details": { "vendor_name": "Vendor A", "vendor_email": "abc@gmail.com" }
}

Response:

{
  "status": "success",
  "message": "Booking created successfully.",
  "bookingId": 1
}

2. Retrieve All Bookings

GET /bookings

Query Parameters (Optional):

date: Filter by booking date (e.g., 2025-01-01)

vendor: Filter by vendor name (e.g., Vendor A)

Response:

[
  {
    "booking_id": 1,
    "customer_name": "bikky",
    "booking_date": "2025-01-01T00:00:00.000Z",
    "amount": 200,
    "vendor_details": { "vendor_name": "Vendor A", "vendor_email": "abc@gmail.com" }
  }
]

3. Retrieve a Booking by ID

GET /bookings/:id

Response (Success):

{
  "booking_id": 1,
  "customer_name": "bikky",
  "booking_date": "2025-01-01T00:00:00.000Z",
  "amount": 200,
  "vendor_details": { "vendor_name": "Vendor A", "vendor_email": "abc@gmail.com" }
}

Response (Not Found):

{
  "status": "failure",
  "message": "Booking not found."
}

4. Delete a Booking

DELETE /bookings/:id

Response (Success):

{
  "status": "success",
  "message": "Booking deleted successfully."
}

Response (Not Found):

{
  "status": "failure",
  "message": "Booking not found."
}


Sequence Diagram

    Client --> API: HTTP Request
    API --> Database: Query Execution (Sequelize)
    Database --> API: Query Result
    API --> Client: HTTP Response

Logging and Error Handling

All errors during API requests are logged to the console for debugging.

Meaningful error messages are returned to the client in case of failures.

Testing

You can use Postman or similar tools to test the endpoints. Automated test scripts can be written using Jest or Mocha (not included in this setup).

Future Enhancements

Add authentication and authorization.

Implement pagination for the /bookings endpoint.

Add support for updating bookings.

License

This project is licensed under the MIT License.

