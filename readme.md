# Cafe Management

## Prerequisites

Ensure the following tools are installed on your system:

- **Git and Git Bash**: For cloning the repository, and the terminal we are gonna use.
- **Node**: This project uses Node. Current version used is Node v18.20.4
- **Docker**: To run the application in a containerized environment.

## Optional Requirements

- **Flyway**: Database Migration.


## Project Setup
> This project follows a monorepo.


```shell
cafe-management
│
├── backend
│
├── flyway
│
├── frontend
│
├── .gitignore
│
├── docker-compose.yml
│
└── readme.md
```

## Folder

- **backend**
  - Contains the server-side application code, this is where our REST API lives.

- **flyway**
  - Holds database migration scripts managed by Flyway. These scripts are responsible for versioning and managing changes in the database schema, typically written in SQL. We just change the content of this directory if we update something in our database.

- **frontend**
  - Contains the client-side application code, this is where our UI lives.

- **docker-compose.yml**
  - This facilitates running the entire stack locally using Docker, including backend, frontend, and databases.


## Getting Started
### Clone the Repository
To get started, clone the repository and navigate to the project directory:
```shell
git clone https://github.com/rbo13/cafe-management.git
cd cafe-management
```

## Running the application:
> NOTE: You really need docker for this one to work

### Running the app using `docker compose`:
```docker
docker compose up --remove-orphans --build
```
If you have an older version of docker where the `compose` command does not exist, you may have to install the separate `docker-compose` binary.

### Running the app using older `docker-compose`:
```docker
docker-compose up --remove-orphans --build
```

### It should bootstrap everything for you, and you should be able to see this result:
![image](https://github.com/user-attachments/assets/15527fa5-ed18-4178-999b-0bad6855b6a0)


You can now open your browser, and see http://localhost:8080.