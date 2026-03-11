# E-Commerce Website - Complete Documentation

## 📋 Project Overview

A production-ready, modern e-commerce platform built with:

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Zustand
- **Backend**: Node.js/Express, MongoDB, JWT Authentication
- **Database**: MongoDB with Mongoose ODM
- **Payment**: Multiple gateways ready (Stripe, Razorpay)
- **Security**: JWT, HTTPS ready, Helmet middleware

---

## 🚀 Quick Start Guide

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Fill in your environment variables
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
PORT=5000

# Start server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local file
cp .env.example .env.local

NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Visit: `http://localhost:3000`

---

## 📁 Project Structure

```
ecommerce-website/
├── backend/
│   ├── config/          # Database & constants
│   ├── models/          # Mongoose schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middlewares/     # Auth, error handling
│   ├── validators/      # Input validation
│   ├── utils/           # Helper functions
│   ├── server.js        # Main server file
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/         # Next.js App Router pages
    │   ├── components/  # Reusable components
    │   ├── context/     # Zustand stores
    │   ├── services/    # API calls
    │   ├── styles/      # Global styles
    │   └── utils/       # Helper functions
    ├── public/          # Static assets
    └── package.json
```

---

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/address` - Add address
- `POST /api/auth/password-reset/request` - Request password reset
- `POST /api/auth/password-reset` - Reset password
- `POST /api/auth/2fa/enable` - Enable 2FA

### Products

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Vendor/Admin)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search` - Search products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories/all` - Get all categories

### Orders & Cart

- `GET /api/orders/cart` - Get cart
- `POST /api/orders/cart` - Add to cart
- `DELETE /api/orders/cart/:productId` - Remove from cart
- `PUT /api/orders/cart/:productId` - Update cart item
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/:orderId/cancel` - Cancel order
- `POST /api/orders/refund/request` - Request refund

### Admin

- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - List all users
- `POST /api/admin/users/:userId/block` - Block user
- `POST /api/admin/users/:userId/unblock` - Unblock user
- `POST /api/admin/vendors/:vendorId/approve` - Approve vendor
- `GET /api/admin/analytics/sales` - Sales analytics

---

## 🗄️ Database Schema

### User Model

- Basic info: firstName, lastName, email, phone
- Authentication: password (hashed), 2FA
- Addresses: Multiple delivery addresses
- Wallet: Balance and transaction history
- Loyalty: Points system
- Preferences: Language, currency, notifications
- Referral: Code and tracking

### Product Model

- Basic: name, slug, description, SKU
- Pricing: price, originalPrice, discount
- Inventory: stock, lowStockThreshold
- Media: images, video (360° support)
- Variants: color, size, customization options
- Details: specifications, attributes, weight, dimensions
- Commerce: rating, reviews, related products
- Management: vendor, status, featured flag

### Order Model

- Details: orderId, user, items, addresses
- Payment: method, status, transaction details
- Fulfillment: shipping, tracking, delivery slot
- Invoice: automatic generation
- Refund: status, reason, timeline
- Timeline: status history with timestamps

### Vendor Model

- Business: name, address, contact
- Banking: account details, GST, PAN
- Commission: rate and wallet
- Verification: document approval
- Policies: return, shipping, warranty
- Store: logo, banner, description

---

## 🔐 Security Features

1. **Authentication**
   - JWT tokens with expiration
   - Refresh token rotation
   - Password hashing with bcrypt
   - Session management

2. **Authorization**
   - Role-based access control (RBAC)
   - Middleware protection
   - Policy-based permissions

3. **Data Protection**
   - HTTPS/SSL ready
   - CORS configuration
   - Helmet security headers
   - Input validation & sanitization
   - Rate limiting

4. **Payment Security**
   - Secure payment gateway integration
   - PCI compliance ready
   - Transaction encryption
   - Fraud detection system

---

## 📦 Key Features Implementation

### 1. User Experience

- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Fast loading with optimization
- ✅ Clean modern UI with Tailwind CSS
- ✅ Category & sub-category navigation
- ✅ Smart search with filters

### 2. Product Features

- ✅ Product listing with pagination
- ✅ Detailed product pages
- ✅ Multiple images & 360° view ready
- ✅ Video preview support
- ✅ Product customization (variants)
- ✅ Stock availability status
- ✅ Reviews & ratings system
- ✅ Q&A section structure

### 3. Shopping Cart

- ✅ Add/remove/update items
- ✅ Guest checkout ready
- ✅ User login integration
- ✅ Persistent cart with localStorage
- ✅ Real-time calculations

### 4. Checkout

- ✅ Multi-step checkout process
- ✅ Address management
- ✅ Multiple payment methods ready
- ✅ Shipping options
- ✅ Delivery date selection
- ✅ Invoice generation

### 5. User Account

- ✅ Registration & login
- ✅ JWT authentication
- ✅ User dashboard
- ✅ Order history & tracking
- ✅ Wishlist support
- ✅ Address management
- ✅ Wallet & loyalty points

### 6. Admin Panel

- ✅ Dashboard with analytics
- ✅ Product management
- ✅ User management
- ✅ Order management
- ✅ Vendor approval system
- ✅ Sales reports

### 7. Marketing

- ✅ Coupon system structure
- ✅ Referral program model
- ✅ Email notification ready
- ✅ Newsletter subscription
- ✅ Featured products display

---

## 🎯 Advanced Features (Ready to Implement)

### AI & Recommendations

- Product recommendation engine
- Smart search with typo correction
- Chatbot for customer support
- Personalized homepage

### AR/VR

- 360° product view
- AR try-on for fashion
- Virtual store browsing

### Analytics

- Sales predictions
- User behavior analysis
- Inventory management
- Revenue reports

### Payment Gateways

- Stripe integration
- Razorpay integration
- Mobile banking
- EMI options
- Wallet system

### Social Features

- Social sharing (Facebook, Instagram, WhatsApp)
- User reviews & ratings
- Community discussions
- Influencer tracking

---

## 🔧 Configuration Files

### Backend .env

```
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
STRIPE_SECRET_KEY=sk_test_xxx
RAZORPAY_KEY_ID=key_xxx
```

### Frontend .env.local

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx
```

---

## 📊 Database Connection

### MongoDB Local Setup

```bash
# Install MongoDB locally or use MongoDB Atlas

# If using MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# If using local MongoDB:
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

### Create Initial Collections

```javascript
// Collections will be created automatically by Mongoose
// Or run these commands in MongoDB client:

db.createCollection('users');
db.createCollection('products');
db.createCollection('orders');
db.createCollection('reviews');
```

---

## 🧪 Testing the APIs

### Using cURL or Postman

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get Products
curl -X GET http://localhost:5000/api/products

# Get Product by ID
curl -X GET http://localhost:5000/api/products/[PRODUCT_ID]
```

---

## 🚀 Deployment Instructions

### Backend Deployment (Heroku)

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com/api
```

### Docker Deployment

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

```bash
# Build and run
docker build -t ecommerce-backend .
docker run -p 5000:5000 ecommerce-backend
```

---

## 📚 Sample Data

### Create Sample Products

```javascript
// backend/scripts/seedData.js
const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones',
    price: 79.99,
    sku: 'WH-001',
    stock: 50,
    category: 'Electronics',
    images: [{ url: 'image-url', primary: true }],
  },
];
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make changes following the project structure
3. Test thoroughly
4. Submit pull request

---

## 📞 Support & Contact

- Email: support@shophub.com
- Phone: +1 (555) 123-4567
- Website: https://shophub.com

---

## 📄 License

MIT License - Free for commercial and personal use

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Zustand Documentation](https://zustand-demo.vercel.app/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Last Updated**: January 2024 **Version**: 1.0.0 **Status**: Production Ready
