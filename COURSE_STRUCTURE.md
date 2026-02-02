# Course Platform Structure

## Data Hierarchy

```
Course (Full Stack Data Builder Academy)
├── Module 1: Foundation Setup (FREE)
│   ├── Lesson 1: Welcome & Overview
│   ├── Lesson 2: Installing Docker
│   └── Lesson 3: Your First Container
├── Module 2: Container Fundamentals (PAID - €99)
│   ├── Lesson 1: Understanding Images
│   └── Lesson 2: Container Networking
├── Module 3: ... (PAID)
└── Module 8: ... (PAID)
```

## Page Routes & Structure

```
app/
├── (marketing)/              # Public pages (no auth required)
│   ├── page.tsx             # Homepage - Course overview & CTA
│   └── layout.tsx           # Marketing layout (header, footer)
│
├── (auth)/                   # Authentication pages
│   ├── login/
│   │   └── page.tsx         # Login page
│   ├── signup/
│   │   └── page.tsx         # Signup page
│   └── layout.tsx           # Auth layout (centered form)
│
├── (platform)/               # Protected pages (auth required)
│   ├── dashboard/
│   │   └── page.tsx         # Student dashboard - enrolled courses, progress
│   │
│   ├── courses/
│   │   └── [courseSlug]/
│   │       ├── page.tsx     # Course overview - all modules & lessons
│   │       │
│   │       └── lessons/
│   │           └── [lessonId]/
│   │               └── page.tsx  # Lesson viewer - video, content, navigation
│   │
│   └── layout.tsx           # Platform layout (sidebar, user menu)
│
└── api/
    ├── auth/[...all]/       # Better Auth API routes
    └── progress/            # Progress tracking API
        └── route.ts
```

## URL Examples

### Public Routes
- `/` - Homepage
- `/login` - Login page
- `/signup` - Signup page

### Protected Routes
- `/dashboard` - Student dashboard
- `/courses/full-stack-data-builder` - Course overview page
- `/courses/full-stack-data-builder/lessons/clx123abc` - Lesson viewer

## Access Control Logic

### Module 1 (Free - Lead Magnet)
- ✅ Anyone can view (no account needed)
- ✅ Guest users can watch all Module 1 lessons
- 🔒 Must sign up to track progress

### Modules 2-8 (Paid - €99)
- 🔒 Requires account (sign up)
- 🔒 Requires active enrollment (payment)
- ✅ Shows "locked" state if not enrolled
- ✅ CTA to purchase course

### Extension Modules (Future Feature)
**Example use cases:**
- Advanced deep-dive modules (€29 each)
- Bonus content for existing students
- Specialized topics (e.g., "Advanced Data Engineering")

**How it would work:**
- Module has `accessType: 'extension'`
- Separate purchase required (even for enrolled students)
- `Enrollment.extensionModules` tracks purchased extensions
- Shows special "Extension" badge in UI
- Different pricing/checkout flow

**For MVP:** Not implementing this yet. All modules are either `'free'` or `'paid'`.

## Key Features Per Page

### 1. Homepage (`/`)
- Hero section with course title
- Module breakdown (show all modules)
- Pricing (Module 1 free, rest €99)
- CTA: "Start for Free" (goes to Module 1, Lesson 1)
- CTA: "Get Full Access" (goes to /signup or payment)

### 2. Dashboard (`/dashboard`)
- List of enrolled courses
- Progress bars per course
- "Continue where you left off" section
- Recent lessons watched

### 3. Course Overview (`/courses/[courseSlug]`)
- Course title & description
- List all modules (collapsible)
- Show all lessons per module
- Visual indicators:
  - ✓ Completed lessons (green checkmark)
  - 🔒 Locked lessons (lock icon + blur)
  - ▶ Available lessons (play icon)
- Progress bar (X of Y lessons completed)
- Enrollment status
- CTA to purchase if not enrolled

### 4. Lesson Viewer (`/courses/[courseSlug]/lessons/[lessonId]`)
**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ Sidebar (collapsible)     │  Main Content              │
│                            │                             │
│ Module 1 ▼                 │  Lesson Title              │
│  ✓ Lesson 1                │                             │
│  ▶ Lesson 2 (current)      │  Video Player              │
│  🔒 Lesson 3               │  (YouTube embed)           │
│                            │                             │
│ Module 2 ▼                 │  Lesson Content            │
│  🔒 Lesson 1 (locked)      │  (Markdown rendered)       │
│  🔒 Lesson 2 (locked)      │                             │
│                            │  Resources                 │
│                            │  - Download links          │
│                            │  - GitHub repos            │
│                            │                             │
│                            │  [Mark Complete] [Next →]  │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- Video player (YouTube embed)
  - Auto-save progress every 10 seconds
  - Resume from last watched timestamp
- Markdown content below video
- Sidebar navigation (all modules & lessons)
- "Mark as complete" checkbox
- Previous/Next lesson navigation
- Download resources section
- Breadcrumb navigation

## Component Structure

```
components/
├── course/
│   ├── CourseCard.tsx           # Course card for listings
│   ├── CourseProgress.tsx       # Progress bar component
│   ├── ModuleAccordion.tsx      # Collapsible module list
│   ├── LessonList.tsx           # List of lessons in a module
│   └── LessonItem.tsx           # Single lesson item with status
│
├── lesson/
│   ├── VideoPlayer.tsx          # YouTube embed with progress tracking
│   ├── LessonContent.tsx        # Markdown renderer
│   ├── LessonNavigation.tsx     # Prev/Next buttons
│   ├── LessonSidebar.tsx        # Course navigation sidebar
│   └── ResourceList.tsx         # Downloadable resources
│
├── shared/
│   ├── Navbar.tsx               # Top navigation
│   ├── Sidebar.tsx              # Platform sidebar
│   ├── ProgressBar.tsx          # Generic progress bar
│   └── LockIcon.tsx             # Locked content indicator
│
└── auth/
    ├── LoginForm.tsx            # Login form
    └── SignupForm.tsx           # Signup form
```

## State Management Strategy

### Client State (React)
- Current video timestamp
- Sidebar open/closed
- UI interactions

### Server State (Database via Prisma)
- User progress (completed lessons, last watched timestamp)
- Enrollment status
- Course/module/lesson data

### Caching Strategy
- Course content: Static (rarely changes) - can be cached
- User progress: Dynamic (frequently updated) - no cache
- Enrollment: Static per user - cache per session

## Next Steps
1. Create Prisma models for Course, Module, Lesson, Progress, Enrollment
2. Build the page structure (layouts and empty pages)
3. Create shared UI components (navbar, progress bars, etc.)
4. Implement the lesson viewer with video player
5. Add progress tracking API
6. Implement access control logic
