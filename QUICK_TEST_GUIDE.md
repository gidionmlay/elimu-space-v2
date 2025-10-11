# ⚡ Quick Test Guide - Instructor Students Feature

## 🚀 Quick Start (5 minutes)

### Step 1: Start Backend
```bash
# Open Terminal 1
cd backend
npm run dev
```
✅ Wait for: `🔌 Socket.IO: Ready`

### Step 2: Start Frontend
```bash
# Open Terminal 2
cd elimu-connect-learn-main
npm run dev
```
✅ Wait for: Frontend URL (usually http://localhost:5173)

### Step 3: Test the Feature
1. **Login as Instructor**
   - Go to http://localhost:5173
   - Login with instructor credentials
   - OR register a new account with role "instructor"

2. **Navigate to Students Page**
   - Click "View All Students" button (blue card)
   - OR go to http://localhost:5173/instructor/students

3. **Verify Features**
   - ✅ Students table loads (or shows empty state)
   - ✅ Search box works (type a name)
   - ✅ Filter dropdown works (select Active/Completed/Inactive)
   - ✅ Click "View" button on a student
   - ✅ Drawer opens with student details
   - ✅ Chart displays correctly
   - ✅ Click "Export CSV" button
   - ✅ CSV file downloads

---

## 🧪 Create Test Data (Optional)

If you need sample students for testing, use MongoDB Compass or mongo shell:

### Create Sample Courses
```javascript
// Connect to MongoDB and switch to database
use elimu_space

// Insert sample courses (replace <instructor_id> with your user ID)
db.courses.insertMany([
  {
    title: "Intro to Agribusiness",
    slug: "intro-to-agribusiness",
    description: "Learn agricultural business basics",
    instructor: ObjectId("<instructor_id>"),
    category: "Business",
    level: "beginner",
    price: 5000,
    is_published: true,
    total_lessons: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

### Create Sample Students
```javascript
// Insert sample students
db.users.insertMany([
  {
    username: "student1",
    email: "student1@example.com",
    password: "$2a$10$abcdefghijklmnopqrstuv", // bcrypt hash
    role: "student",
    first_name: "Jane",
    last_name: "Doe",
    is_active: true,
    is_verified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "student2",
    email: "student2@example.com",
    password: "$2a$10$abcdefghijklmnopqrstuv",
    role: "student",
    first_name: "John",
    last_name: "Smith",
    is_active: true,
    is_verified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

### Create Sample Enrollments
```javascript
// Get course and student IDs first
const course = db.courses.findOne({slug: "intro-to-agribusiness"})
const student1 = db.users.findOne({username: "student1"})
const student2 = db.users.findOne({username: "student2"})

// Insert enrollments
db.enrollments.insertMany([
  {
    user: student1._id,
    course: course._id,
    progress: 75,
    completed_lessons: 7,
    is_completed: false,
    status: "active",
    enrollment_date: new Date("2025-09-01"),
    last_accessed: new Date("2025-10-08"),
    lastActivityAt: new Date("2025-10-08"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    user: student2._id,
    course: course._id,
    progress: 100,
    completed_lessons: 10,
    is_completed: true,
    status: "completed",
    enrollment_date: new Date("2025-08-15"),
    last_accessed: new Date("2025-10-05"),
    lastActivityAt: new Date("2025-10-05"),
    completion_date: new Date("2025-10-05"),
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

---

## 🔍 Verify Installation

### Check Backend Dependencies
```bash
cd backend
npm list socket.io
```
✅ Should show socket.io version

### Check Frontend Dependencies
```bash
cd elimu-connect-learn-main
npm list socket.io-client recharts date-fns
```
✅ Should show all three packages

---

## 🐛 Quick Fixes

### Problem: Backend won't start
```bash
cd backend
npm install
npm run dev
```

### Problem: Frontend won't start
```bash
cd elimu-connect-learn-main
npm install
npm run dev
```

### Problem: MongoDB not running
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Problem: Socket.IO not connecting
1. Check backend is running on port 3000
2. Check frontend `.env.local` file:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```
3. Restart both servers

### Problem: No students showing
1. Verify you're logged in as instructor
2. Verify instructor has created courses
3. Verify students are enrolled in those courses
4. Check browser console (F12) for errors

---

## ✅ Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can login as instructor
- [ ] Can navigate to /instructor/students
- [ ] Students table loads or shows empty state
- [ ] Search works
- [ ] Filter works
- [ ] View details drawer opens
- [ ] CSV export works
- [ ] Socket.IO connects (check console)

---

## 📱 Browser Console Commands

Open browser console (F12) and run:

```javascript
// Check Socket.IO connection
console.log('Socket.IO connected:', window.io !== undefined)

// Check API base URL
console.log('API Base:', import.meta.env.VITE_API_BASE_URL)

// Check auth token
console.log('Token:', localStorage.getItem('access_token') ? 'Present' : 'Missing')
```

---

## 🎯 Expected Results

### Empty State (No Students)
- Shows friendly message
- Shows user icon
- No table visible

### With Students
- Table with columns: Icon, Student, Courses, Progress, Status, Last Activity, Actions
- Progress bars show correctly
- Status badges color-coded
- Last activity shows relative time ("2 days ago")

### Student Details Drawer
- Opens from right side
- Shows student info
- Shows course list with progress bars
- Shows chart with course progress
- Tabs: Courses (working), Notes (placeholder), Messages (placeholder)

### CSV Export
- Downloads file named: `students_2025-10-10.csv`
- Contains columns: Name, Email, Courses, Progress, Status, Last Activity
- Opens correctly in Excel/Sheets

---

**Need help?** Check `INSTRUCTOR_STUDENTS_IMPLEMENTATION.md` for full documentation.

