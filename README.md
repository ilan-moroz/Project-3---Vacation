## Table of Contents

- [General Info](#general-info)
- [Roles and Functionalities](#roles-and-functionalities)
- [Infrastructure](#infrastructure)
- [User Interface](#user-interface)
- [Getting Started](#getting-started)

## General Info

This project is a vacation management system with two types of roles: Users and Admin. It provides the functionality to manage and view vacations based on different parameters.

## Roles and Functionalities

### User

- View vacations.
- Follow/Unfollow vacations.

### Admin

- Add, edit, and delete vacations.
- View reports and download CSV file.

## Infrastructure

The project is built using:

- Database: MySQL
- Server Side: REST API in Node.js using Express
- Client Side: React with Redux using typescript

## User Interface

### Vacations Page (User)

- Only logged in users can view the vacations page.
- Display vacation details, followers, and follow status.
- Pagination support for displaying vacations.
- Filtering options for displayed vacations.

### Admin Interface

#### Vacation Page

- Option to add a new vacation.
- Delete and edit options for each vacation card.

#### Vacation Reports Page

- Display all vacations names, including their follower counts, and provide an option to download the CSV file.

## Getting Started

### Prerequisites

- Node.js
- MySQL
- React
- Redux
- TypeScript
- Express
- Docker

### Installation

```bash
# Clone the repo
git clone <Project-3-Vacation>

# Install server side NPM packages
cd backend
npm install

# Install client side NPM packages
cd frontend
npm install

# Run the development server
cd backend
npm start

# Run the development client
cd frontend
npm start
```
