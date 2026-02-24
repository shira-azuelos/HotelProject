# Hotel Management System

A professional **RESTful API** built with **.NET 8 Core** designed to manage hotel operations, including room inventory, customer bookings, and user administration.

## Features

- **User Management:** Secure handling of staff and guest data.
- **Room Management:** Dynamic tracking of room types, pricing, and availability.
- **Booking Engine:** Full lifecycle of a reservation (Pending, Confirmed, Canceled).
- **Clean Architecture:** Divided into Core, Data, Services, and API layers for maximum maintainability.
- **Data Persistence:** SQL Server integration using Entity Framework Core.
- **Automated Testing:** Comprehensive Unit Tests using xUnit and Moq.

## Database Schema

The system is built on a relational database with the following structure:

### 1. Users Table

| Column       | Type     | Description                           |
| :----------- | :------- | :------------------------------------ |
| **Id**       | int (PK) | Unique identifier for the user        |
| **FullName** | string   | The full name of the user             |
| **Email**    | string   | Unique email address (used for login) |
| **Password** | string   | Encrypted password                    |
| **Role**     | enum     | Admin, Staff, or Customer             |

### 2. Rooms Table

| Column            | Type     | Description                    |
| :---------------- | :------- | :----------------------------- |
| **Id**            | int (PK) | Unique identifier for the room |
| **RoomNumber**    | string   | The physical room number       |
| **Type**          | string   | Single, Double, Suite, etc.    |
| **PricePerNight** | decimal  | Cost for one night             |
| **IsAvailable**   | bool     | Current status of the room     |

### 3. Bookings Table

| Column           | Type     | Description                                |
| :--------------- | :------- | :----------------------------------------- |
| **Id**           | int (PK) | Unique identifier for the booking          |
| **UserId**       | int (FK) | Reference to the user who made the booking |
| **CheckInDate**  | DateTime | Start date of the stay                     |
| **CheckOutDate** | DateTime | End date of the stay                       |
| **TotalPrice**   | decimal  | Total cost calculated for the stay         |
| **Status**       | enum     | Pending, Confirmed, Canceled               |

### 4. BookingRooms (Junction Table)

| Column        | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| **BookingId** | int (FK) | Reference to the booking       |
| **RoomId**    | int (FK) | Reference to the assigned room |

## Tech Stack

- **Language:** C# / .NET 8
- **Framework:** ASP.NET Core Web API
- **ORM:** Entity Framework Core
- **AutoMapper:** For DTO-to-Entity mapping
- **Database:** Microsoft SQL Server
- **Testing:** xUnit / FluentAssertions

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/shira-azuelos/HotelProject.git](https://github.com/shira-azuelos/HotelProject.git)
   ```
