Frontend Development Roadmap
Frontend Setup
│
├── Phase 1
│ ├── React + Vite
│ ├── Tailwind CSS
│ ├── React Router
│ ├── Axios
│ ├── React Icons
│ └── React Hot Toast
│
├── Phase 2
│ ├── Folder Structure
│ ├── API Layer
│ ├── Authentication Context
│ ├── Protected Routes
│ └── Layout
│
├── Phase 3
│ ├── Login
│ ├── Register
│ └── Dashboard
│
├── Phase 4
│ ├── Customer Module
│ ├── Worker Module
│ ├── Jobs
│ ├── Applications
│ ├── Payments
│ └── Reviews
│
└── Phase 5
├── Notifications
├── Messages
└── Deployment

---

Step 5 — Axios Setup

Create

src/api/axios.js
axios.js
import axios from "axios";

const api = axios.create({
baseURL: "http://localhost:8000/api",
headers: {
"Content-Type": "application/json",
},
});

export default api;
Why are we creating this?

Instead of writing

axios.post(
"http://localhost:8000/api/auth/login"
)

everywhere,

we'll write

api.post("/auth/login")

Much cleaner.

Step 6 — Services

Inside

src/services

Create

auth.service.js
auth.service.js
import api from "../api/axios";

export const loginUser = (data) => {
return api.post("/auth/login", data);
};

export const registerUser = (data) => {
return api.post("/auth/register", data);
};

Now the Login page won't directly call Axios.

Instead

Login.jsx

↓

auth.service.js

↓

axios.js

↓

Backend API

This is exactly the same architecture we followed in the backend.

Current Frontend Architecture
Pages

↓

Services

↓

Axios

↓

Express Backend

↓

Prisma

↓

PostgreSQL

Notice how both frontend and backend now have a clean layered architecture.

---

Phase 2 — Login Module

We'll build it in this order:

Login Module

Step 1 Login Page UI
Step 2 Local State
Step 3 API Integration
Step 4 Loading State
Step 5 Error Handling
Step 6 Success Toast
Step 7 Store JWT
Step 8 Navigate Dashboard

---

Current Flow

User

↓

Enter Email

↓

Enter Password

↓

Console.log()

Next Flow

User

↓

Enter Email

↓

Enter Password

↓

POST /api/auth/login

↓

JWT Token

↓

Save Token

↓

Save User

↓

Navigate Dashboard

This is where your frontend will connect to your backend for the first time.

We'll implement in this order
Login Page

⬜ Connect Login API

↓

⬜ Loading Spinner

↓

⬜ Error Handling

↓

⬜ Success Toast

↓

⬜ Save JWT

↓

⬜ Save User

↓

⬜ Redirect Dashboard
After Login

We'll build the application exactly like a company project.

Authentication

↓

Dashboard Layout

↓

Navbar

↓

Sidebar

↓

Customer Dashboard

↓

Worker Dashboard

↓

Jobs

↓

Applications

↓

Reviews

↓

Payments
Here's the roadmap from now
Week 1
✅ Login

⬜ Register

⬜ Auth Context

⬜ Protected Routes

⬜ Dashboard Layout
Week 2
Customer Dashboard

Create Job

My Jobs

Update Job

Delete Job
Week 3
Worker Dashboard

Worker Profile

Browse Jobs

Apply Job

My Applications
Week 4
Payments

Reviews

Polish UI

---

🚀 Next Phase

Now we need to move from Local Storage based authentication to React Context based authentication.

This is the same pattern used in production React applications.

Next Development Order
Step 1 (Next)

Create Authentication Context

src/context/
AuthContext.jsx
Step 2

Create custom hook

src/hooks/
useAuth.js

Then anywhere in the application we can simply write

const { user } = useAuth();

instead of

const user = getUser();
Step 3

Wrap the application

<AuthProvider>

    <App />

</AuthProvider>

Now every page gets access to

user
token
login()
logout()
isAuthenticated
Step 4

Create Protected Route

src/routes/
ProtectedRoute.jsx

Flow:

User

↓

Dashboard

↓

Authenticated?

↓

YES → Dashboard

NO → Login
Step 5

Dashboard Layout

layouts/

DashboardLayout.jsx

Containing

Navbar

Sidebar

Content
Step 6

Customer Dashboard

Dashboard

↓

Create Job

↓

My Jobs

↓

Edit Job

↓

Delete Job
Step 7

Worker Dashboard

Dashboard

↓

Browse Jobs

↓

Apply Job

↓

My Applications

↓

Reviews
Complete Frontend Roadmap
Frontend

## Phase 1

✅ Project Setup

## Phase 2

✅ Login
✅ JWT Storage
⬜ Auth Context
⬜ Protected Route

## Phase 3

⬜ Dashboard Layout
⬜ Navbar
⬜ Sidebar

## Phase 4

⬜ Customer Dashboard
⬜ Worker Dashboard

## Phase 5

⬜ Jobs Module
⬜ Applications Module

## Phase 6

⬜ Payments
⬜ Reviews

## Phase 7

⬜ Notifications
⬜ Messages

## Phase 8

⬜ Deployment

---

Login Page
│
▼
Auth Service
│
▼
Backend
│
▼
JWT + User
│
▼
AuthContext.login()
│
▼
authStorage.js
│
▼
Local Storage
│
▼
React State

---

🚀 Next Phase

Now we move to the Application Layout.

Every page after login should look like this:

+-----------------------------------------------------------+
| Navbar |
+----------------------+------------------------------------+
| | |
| | |
| Sidebar | Main Content |
| | |
| | |
| | |
+----------------------+------------------------------------+

Notice something important:

The Navbar and Sidebar never change.

Only the Main Content changes.

For example:

Dashboard

Navbar
Sidebar
Dashboard Content

↓

Jobs

Navbar
Sidebar
Jobs Content

↓

Payments

Navbar
Sidebar
Payments Content

Instead of writing Navbar and Sidebar on every page, React gives us Layouts.

Development Order

We'll build it exactly like this.

Dashboard Layout

Step 1
Create DashboardLayout

↓

Step 2
Navbar Component

↓

Step 3
Sidebar Component

↓

Step 4
Dashboard Page

↓

Step 5
Nested Routing
