# ⚡ LeadDesk Mini

**LeadDesk Mini** is an enterprise-ready inbound lead operations and management platform designed to capture, validate, organize, and track business inquiries with a real-time administrative portal and secure role-based access control.

---

## 🚀 Tech Stack

The application is built using a modern, type-safe full-stack TypeScript architecture:

### **Frontend & Framework**
- **[Next.js 16 (App Router)](https://nextjs.org/)** – Server-first React framework utilizing Server Actions, Suspense, and dynamic route rendering.
- **[React 19](https://react.dev/)** – UI library for building dynamic, interactive user interfaces.
- **[Tailwind CSS v4](https://tailwindcss.com/)** – Utility-first CSS framework for custom, modern dark-mode aesthetics.
- **[Shadcn UI](https://ui.shadcn.com/) & [Base UI](https://base-ui.com/)** – Accessible, customizable UI component primitives.
- **[Lucide React](https://lucide.dev/)** – Iconography set for UI state indicators.
- **[Sonner](https://sonner.emilkowal.ski/)** – Toast notification system for user feedback.

### **Backend & Database**
- **[PostgreSQL](https://www.postgresql.org/) & [Neon](https://neon.tech/)** – Serverless cloud PostgreSQL database.
- **[Prisma ORM v7](https://www.prisma.io/)** – Type-safe ORM utilizing `@prisma/adapter-neon` for serverless connection pooling.
- **Next.js Server Actions** – Direct, secure server executions (`use server`) with automatic path revalidation (`revalidatePath`).

### **Authentication & Security**
- **[Clerk (`@clerk/nextjs`)](https://clerk.com/)** – User authentication management, sign-in/sign-up flows, session management, and auth middleware.
- **Custom Middleware RBAC** – Edge middleware protecting `/admin` routes via email whitelisting (`ADMIN_EMAILS`) and Clerk public metadata roles (`role: "admin"`).

### **Form Handling & Validation**
- **[React Hook Form](https://react-hook-form.com/)** – Performant form state management.
- **[Zod](https://zod.dev/)** – End-to-end schema validation for client input and server handlers.

---

## 🛠️ Project Architecture & How It Works

```
├── Public User (Landing Page)  ──> Submit Lead Form (Zod Validation)
│                                          │
│                                          ▼
│                              Server Action: `createLead()`
│                                          │
│                                          ▼
│                              PostgreSQL (Neon via Prisma)
│                                          │
└──── Admin Portal (`/admin`)  <── Middleware Guard (Clerk & RBAC)
            │
            ├── Metrics Dashboard (Total, New, Contacted, Closed)
            ├── Live Search & Filter (Debounced Lead Search by Name/Email)
            └── Inline Status Updates (NEW ➔ CONTACTED ➔ CLOSED)
```

### 1. **Public Lead Capture (`/`)**
- **Inquiry Submission Form**: Allows potential clients to submit inquiries with fields:
  - **Full Name**
  - **Work Email**
  - **Estimated Budget** (`$1k - $5k`, `$5k - $10k`, `$10k - $25k`, `$25k+`)
  - **Project Details / Message**
- **Validation Pipeline**: Dual-layer validation (React Hook Form on client, Zod schema in Server Actions) prevents invalid submissions.
- **Database Persistence**: Submitted leads are stored in PostgreSQL with a default status of `NEW`.
- **Instant Cache Revalidation**: Invokes `revalidatePath('/admin')` to update lead counts real-time on the admin dashboard.

### 2. **Authentication & Authorization Middleware (`middleware.ts`)**
- Intercepts all requests targeting `/admin` and its sub-routes.
- Enforces authentication via Clerk (`auth.protect()`).
- Verifies admin privileges using two checks:
  1. Checks if the user's primary/secondary email is in the `ADMIN_EMAILS` environment variable list.
  2. Checks if the user's Clerk `publicMetadata` includes `role: "admin"`.
- Non-authorized authenticated users are automatically redirected to `/unauthorized`.

### 3. **Admin Operations Dashboard (`/admin`)**
- **Real-Time Metrics Overview**: Summary cards displaying live metrics:
  - **Total Leads** – Aggregate lead record count.
  - **New** – Submissions pending initial review.
  - **Contacted** – Active client engagement.
  - **Closed** – Completed inquiries.
- **Interactive Leads Table**:
  - **Live Search**: Debounced search by client name or email address (case-insensitive search).
  - **Status Filtering**: Filter view by specific lead status (`ALL`, `NEW`, `CONTACTED`, `CLOSED`).
  - **Inline Status Transition**: Update lead status directly in the table row dropdown via the `updateLeadStatus` Server Action.
  - **Responsive Design**: Renders a desktop data table on large screens and collapsible mobile-optimized cards on smaller viewports.

---

## 🗄️ Database Schema

The Prisma database model (`prisma/schema.prisma`) defines the core data structure:

```prisma
enum LeadStatus {
  NEW
  CONTACTED
  CLOSED
}

model Lead {
  id        String     @id @default(cuid())
  name      String
  email     String
  budget    String
  message   String     @db.Text
  status    LeadStatus @default(NEW)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  @@index([status])
  @@index([createdAt])
}
```

---

## 📂 Project Directory Structure

```
lead-desk-mini/
├── prisma/
│   ├── migrations/         # Database migration history
│   └── schema.prisma       # Prisma data model & enum configuration
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router routes & layouts
│   │   ├── admin/          # Protected Admin Dashboard (/admin)
│   │   ├── sign-in/        # Clerk Authentication Sign-in page
│   │   ├── sign-up/        # Clerk Authentication Sign-up page
│   │   ├── unauthorized/   # Access Denied page for non-admin users
│   │   ├── globals.css     # Tailwind CSS styles & base theme
│   │   ├── layout.tsx      # Root layout wrapped with ClerkProvider
│   │   └── page.tsx        # Public landing page with lead form
│   ├── components/         # React Components
│   │   ├── admin/          # Admin UI (LeadsTable, MetricsCards, StatusBadge, StatusSelect)
│   │   ├── ui/             # Reusable Shadcn UI primitives (Button, Input, Select, etc.)
│   │   └── lead-form.tsx   # Public lead submission form component
│   ├── generated/          # Auto-generated Prisma Client files
│   ├── lib/                # Utilities, Actions & Validations
│   │   ├── actions/        # Server Actions (leads.ts for CRUD operations)
│   │   ├── validations/    # Zod schemas (lead.ts, lead-status.ts)
│   │   ├── db.ts           # Prisma client initialization with Neon adapter
│   │   └── utils.ts        # Helper functions (clsx, tailwind-merge)
│   └── middleware.ts       # Clerk authentication & RBAC middleware
├── .env.sample             # Environment variable template
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies & npm scripts
├── prisma.config.ts        # Prisma CLI configuration
└── tsconfig.json           # TypeScript configuration
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory using `.env.sample` as a reference:

```env
# Database Connection (Neon / PostgreSQL Connection String)
DATABASE_URL=""

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Admin Email
ADMIN_EMAILS="[EMAIL_ADDRESS]"
```

---

## 🚀 Getting Started

### 1. **Clone & Install Dependencies**
```bash
git clone https://github.com/harsh3224h/lead-desk-mini
cd lead-desk-mini
npm install
```

### 2. **Setup Environment & Database**
Configure your `.env` file, then run database migrations and generate the Prisma client:

```bash
# Push schema changes to your database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 3. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Public Site**: `http://localhost:3000`
- **Admin Dashboard**: `http://localhost:3000/admin` *(requires logging in with an email listed in `ADMIN_EMAILS` or having `admin` metadata role)*

---

## 🧪 Available Scripts

- `npm run dev` – Starts the Next.js development server.
- `npm run build` – Builds the production bundle.
- `npm run start` – Runs the compiled production build locally.
- `npm run lint` – Runs ESLint code quality checks.
