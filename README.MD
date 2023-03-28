<h1 align="center">Secure Software Engineering Assignment</h1>

<div align="center">
  <strong>Based on the Management of IT Projects Journey Planner Application</strong> <br/>
A requirement from the original project was that a 'Customer' user type can purchase, store and display an E-Ticket to be used on buses.

I will be using this functionality as the basis of the Secure Software Engineering assignment.

I have decided to implement a 'Driver' user type who is an employee of South Yorkshire Buses, that drives the buses and checks the validity of the Customer's ticket.

An 'Administrator' user type is an employee of South Yorkshire Buses, who is able to control the types of tickets available for purchase and can update the ticket attributes stored in the database.

</div>
<br />

<div align="center">
<br />
Built by
<a href="https://github.com/Alicee5cha">Alice Chambers</a>
</a>
</sub>
</div>

## Running the project

# Prerequisites

Docker engine installed.
Node.js installed.
Yarn installed.

### Server

Copy the `.env.template` file and rename it to `.env` adding the necessary data required to run the application.

Install the server packages via running `yarn install`.

Once the packages have installed, run the server `yarn start`.

### Client

Copy the `.env.template` file and rename it to `.env` adding the necessary data required to run the application.

Install the client packages via running `yarn install`.

Once the packages have installed, run the client `yarn start`.

### Docker

To run the Keycloak Authorisation and Access Control server at port 8080, run the command `docker compose -f ./server/DevOps/docker/docker-compose-keycloak.yml up` from the root of the application.

To run all the application containers (client at port 3000, server at port 3001, keycloak at port 8080) run the command `docker compose -f ./server/DevOps/docker/docker-compose.yml up` from the root of the application.

### Tests

Run the cypress test suite headlessly `yarn run cy:run`.

Run the test suite with the GUI `yarn run cy:open`.
