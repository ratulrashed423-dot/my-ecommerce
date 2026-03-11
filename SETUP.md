# Development Setup Guide

## Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- MongoDB (local or Atlas)
- Git
- Code editor (VS Code recommended)

---

## Quick Start (5 minutes)

### 1. Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd ecommerce-website

# Backend setup
cd backend
npm install
cp .env.example .env

# Frontend setup (in new terminal)
cd frontend
npm install
cp .env.example .env.local
```

### 2. Configure Environment

#### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=dev_secret_key_123
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start Services

#### Terminal 1 - MongoDB

```bash
# If MongoDB is installed locally
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

#### Terminal 2 - Backend

```bash
cd backend
npm run dev
# Server running on http://localhost:5000
```

#### Terminal 3 - Frontend

```bash
cd frontend
npm run dev
# Frontend on http://localhost:3000
```

---

## Detailed Setup

### Step 1: Install Node.js

#### Windows

1. Download from [nodejs.org](https://nodejs.org/)
2. Run installer
3. Verify: `node --version` && `npm --version`

#### macOS

```bash
brew install node
```

#### Linux (Ubuntu)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

### Step 2: Install MongoDB

#### Option A: Local MongoDB

**Windows**

1. Download from
   [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run MSI installer
3. MongoDB runs as service on port 27017

**macOS**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux**

```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

#### Option B: MongoDB Atlas (Cloud)

1. Create free account at
   [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Create user and get connection string
4. Update `.env`:
   `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce`

---

### Step 3: Git Setup

```bash
# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Clone repository
git clone <repository-url>
cd ecommerce-website

# Create feature branch
git checkout -b feature/my-feature
```

---

### Step 4: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings
nano .env
# or use your editor

# Test MongoDB connection
npm run dev

# Seed sample data (optional)
node scripts/seedData.js
```

#### Verify Backend

```bash
curl http://localhost:5000/api/health
# Response: { "status": "OK" }
```

---

### Step 5: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local
nano .env.local

# Start development server
npm run dev
```

#### Verify Frontend

Open [http://localhost:3000](http://localhost:3000) in browser

---

## Project Structure Deep Dive

### Backend Folders

```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── constants.js       # App constants
├── models/
│   ├── User.js            # User schema
│   ├── Product.js         # Product & Category schema
│   ├── Review.js          # Review, Cart, Order
│   └── Vendor.js          # Vendor, Coupon, Referral
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── productController.js
│   ├── orderController.js
│   └── adminController.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── adminRoutes.js
├── middlewares/
│   ├── authMiddleware.js  # JWT verification
│   └── errorMiddleware.js # Error handling
├── validators/
│   └── validators.js      # Input validation
├── utils/
│   ├── generateToken.js   # Helper functions
│   └── emailService.js    # Email functionality
├── scripts/
│   └── seedData.js        # Database seeding
└── server.js              # Entry point
```

### Frontend Folders

```
frontend/
├── src/
│   ├── app/               # Next.js pages
│   │   ├── page.js        # Home page
│   │   ├── layout.js      # Root layout
│   │   ├── globals.css    # Global styles
│   │   ├── login/page.js
│   │   ├── register/page.js
│   │   ├── products/page.js
│   │   ├── product/[id]/page.js
│   │   ├── cart/page.js
│   │   ├── checkout/page.js
│   │   ├── profile/page.js
│   │   └── admin/page.js
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Hero.jsx
│   │   └── Filters.jsx
│   ├── context/           # Zustand stores
│   │   ├── authContext.js
│   │   └── cartContext.js
│   ├── services/          # API calls
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── orderService.js
│   ├── styles/            # Additional styles
│   └── utils/             # Helper functions
├── public/                # Static assets
│   └── images/
└── node_modules/          # Dependencies
```

---

## Common Development Tasks

### Create a New API Endpoint

#### 1. Create Controller

```javascript
// backend/controllers/newController.js
export const getNewData = async (req, res) => {
  try {
    // Your logic here
    res.json({ data: [...] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### 2. Create Route

```javascript
// backend/routes/newRoutes.js
import { getNewData } from '../controllers/newController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/', authMiddleware, getNewData);
export default router;
```

#### 3. Register Route in server.js

```javascript
import newRoutes from './routes/newRoutes.js';
app.use('/api/new', newRoutes);
```

### Create a New Page

#### 1. Create Page Component

```javascript
// frontend/src/app/newpage/page.js
'use client';
import { useState, useEffect } from 'react';

export default function NewPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data
  }, []);

  return <div className="container">{/* Your JSX */}</div>;
}
```

#### 2. Add Navigation Link

```javascript
// In components/Navbar.jsx
<Link href="/newpage">New Page</Link>
```

### Create a New Component

```javascript
// frontend/src/components/MyComponent.jsx
'use client';
export default function MyComponent({ prop1, prop2 }) {
  return <div className="card">{/* Component content */}</div>;
}
```

---

## Database Operations

### Using MongoDB Compass (GUI)

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to your MongoDB instance
3. Browse collections visually

### Common Queries

```javascript
// Connect to MongoDB shell
mongosh

// Switch to database
use ecommerce

// View collections
show collections

// Find documents
db.users.find()
db.products.find({ price: { $gt: 50 } })

// Count documents
db.products.countDocuments()

// Update document
db.users.updateOne({ _id: ObjectId("...") }, { $set: { role: "admin" } })

// Delete document
db.users.deleteOne({ _id: ObjectId("...") })
```

---

## Testing APIs

### Using VS Code REST Client Extension

Create file `test.http`:

```http
### Get Products
GET http://localhost:5000/api/products

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

### Create Product (with token)
POST http://localhost:5000/api/products
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "New Product",
  "price": 99.99,
  "sku": "NP-001"
}
```

Click "Send Request" above each request.

---

## Debugging

### Backend Debugging

```javascript
// Add console logs
console.log('User data:', user);
console.error('Error:', error);

// Use debugger
debugger; // Pause execution

// Run with debugger
node --inspect server.js
# Visit chrome://inspect in Chrome
```

### Frontend Debugging

1. **Browser DevTools** (F12)
   - Console tab for errors
   - Network tab for API calls
   - Application tab for localStorage

2. **VS Code Debugger**
   - Install "Debugger for Chrome"
   - Create `.vscode/launch.json`
   - Set breakpoints and debug

3. **React DevTools**
   - Install Chrome extension
   - Inspect component props/state

---

## Performance Optimization

### Backend

```javascript
// Add caching
const cache = new Map();

// Pagination for large datasets
const limit = 10;
const skip = (page - 1) * limit;

// Index frequently searched fields
productSchema.index({ category: 1, status: 1 });

// Use projection to limit data
User.find({}, { password: 0 }); // Exclude password
```

### Frontend

```javascript
// Lazy load components
const Heavy = dynamic(() => import('./Heavy'), {
  loading: () => <div>Loading...</div>,
})

// Memoize components
const MemoComponent = React.memo(Component)

// Lazy load images
<Image
  src={url}
  width={400}
  height={400}
  loading="lazy"
/>
```

---

## VS Code Extensions (Recommended)

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **MongoDB for VS Code**
- **REST Client**
- **Thunder Client**
- **GitLens**
- **Prettier - Code formatter**
- **ESLint**

---

## NPM Scripts Reference

### Backend

```bash
npm run dev      # Start with nodemon
npm start        # Start production
npm test         # Run tests
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linter
```

---

## Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Ensure MongoDB is running
2. Check MONGODB_URI in .env
3. Verify username/password for Atlas
```

### Port Already in Use

```bash
# Find and kill process using port 5000
lsof -i :5000
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy

Solution:
1. Check FRONTEND_URL in backend .env
2. Verify CORS configuration in server.js
3. Ensure Authorization header is set in API calls
```

---

## Version Control Best Practices

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/feature-name

# Create pull request on GitHub

# Merge after review
git checkout main
git merge feature/feature-name
git push origin main
```

---

## Next Steps

1. ✅ Setup development environment
2. 📖 Read API documentation
3. 🔨 Start building features
4. 🧪 Test APIs with REST Client
5. 🐛 Debug using browser DevTools
6. 🚀 Prepare for deployment

---

**Happy Coding! 🚀**

For questions or issues, check the README.md or create an issue on GitHub.
