🎓 Student & Admin Management System (MERN Backend)
    A robust, enterprise-ready backend system built with TypeScript, Node.js, Express, and MongoDB. This project implements a decoupled architecture utilizing the Repository Pattern, Service Layer, and manual Dependency Injection to achieve strict adherence to SOLID design principles.

🏗️ Architecture Overview
    The application splits responsibilities cleanly into isolated layers, preventing business logic from leaking into routing or database storage mechanics.

Incoming Request 
       │
       ▼
 ┌───────────┐
 │  app.ts   │  ◄── Routing & Controller Layer (HTTP parsing)
 └─────┬─────┘
       │ (Passes plain data objects)
       ▼
 ┌───────────┐
 │  Service  │  ◄── Business Logic Brain (Validations, workflows)
 └─────┬─────┘
       │ (Invokes IBaseRepository abstract contract)
       ▼
 ┌───────────┐
 │Repository │  ◄── Data Access Layer (Mongoose/MongoDB communication)
 └─────┬─────┘
       │ (Performs DB mapping)
       ▼
 ┌───────────┐
 │DomainClass│  ◄── Pure Domain Models (Type-safe SystemUser, Student, Admin)
 └───────────┘
🛠️ Design Patterns Implemented
1. Repository Pattern
Database operations are completely decoupled from the application engine via IBaseRepository<T>. Concrete implementations handle structural mapping (mapTranslate), converting messy database rows into clean, domain-specific class instances before returning them to the upper layers.

2. Dependency Injection (DI)
Repositories are instantiated externally and injected straight into the constructors of their respective services. This keeps services completely independent of specific storage tools or database engines.

TypeScript
const studentRepo = new StudentRepository();
const studentService = new StudentService(studentRepo); // Tool injected into the brain
3. Polymorphism & Inheritance
Core identities inherit from a common base abstract class (SystemUser). Polymorphic methods like getRoleDetails() allow varying runtime outputs based on individual class implementations.

📐 SOLID Principles Alignment
S - Single Responsibility: app.ts only routes data, Services only handle business constraints, and Repositories only interface with MongoDB.

O - Open/Closed: Extending the platform to support Admin modules didn't require modifying existing, verified Student code structures.

L - Liskov Substitution: Anywhere a base SystemUser type is requested, a concrete Student or Admin instance can safely stand in.

I - Interface Segregation: The generic IBaseRepository<T> contract remains tightly focused on core CRUD behaviors, preventing bloated implementations.

D - Dependency Inversion: High-level services depend on the abstract IBaseRepository<T> interface rather than importing concrete database worker scripts directly.

🚀 Getting Started
Prerequisites
Node.js (v18+ recommended)

MongoDB (v8.x local instance running with authorization, or MongoDB Atlas)

Installation Steps
Clone the repository and navigate to the project directory.

Install the necessary dependencies:

npm install

3. Set up your environmental variables if necessary, or ensure your local instance connects to your default application databases (e.g., `fooddb`, `Ecommerce`).
4. Compile and start the application in development mode:
   ```bash
   npm run dev
🔌 API Endpoints
Student Modules
POST /student - Registers a new student system profile.

Payload: { "name": "Dawn", "email": "dawn@mail.com", "course": "Full-Stack Development" }

GET /student/:id - Retrieves a specific student account profile record.

Admin Modules
POST /admin - Registers a new administrative access tier.

Payload: { "name": "AdminUser", "email": "admin@mail.com", "controlLevel": "SuperAdmin" }

GET /admin/:id - Fetches polymorphic account role layouts via the service engine.