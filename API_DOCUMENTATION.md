# Backend API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints Reference

### 1. Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "securePassword123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ...user_object }
}
```

#### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ...user_object }
}
```

#### Get Profile

```http
GET /auth/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "user": { ...user_object }
}
```

#### Update Profile

```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "bio": "Updated bio"
}

Response: 200 OK
{
  "message": "Profile updated successfully",
  "user": { ...updated_user }
}
```

#### Add Address

```http
POST /auth/address
Authorization: Bearer <token>
Content-Type: application/json

{
  "label": "Home",
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "USA",
  "isDefault": true
}

Response: 201 Created
```

---

### 2. Product Endpoints

#### Get All Products

```http
GET /products?page=1&limit=10&category=electronics&minPrice=10&maxPrice=1000&rating=4

Response: 200 OK
{
  "products": [ ...products ],
  "pagination": {
    "total": 150,
    "pages": 15,
    "currentPage": 1,
    "limit": 10
  }
}
```

#### Get Product by ID

```http
GET /products/[productId]

Response: 200 OK
{
  "product": { ...product_object }
}
```

#### Search Products

```http
GET /products/search?q=headphones&page=1&limit=10

Response: 200 OK
{
  "products": [ ...matching_products ],
  "query": "headphones"
}
```

#### Get Featured Products

```http
GET /products/featured

Response: 200 OK
{
  "products": [ ...featured_products ]
}
```

#### Get Categories

```http
GET /products/categories/all

Response: 200 OK
{
  "categories": [
    {
      "_id": "xxx",
      "name": "Electronics",
      "slug": "electronics",
      "image": "url"
    }
  ]
}
```

#### Create Product (Vendor/Admin)

```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "price": 29.99,
  "originalPrice": 39.99,
  "sku": "WM-001",
  "stock": 100,
  "category": "categoryId",
  "images": [
    {
      "url": "image-url",
      "altText": "Product Image",
      "primary": true
    }
  ],
  "attributes": [
    {
      "name": "Color",
      "options": ["Black", "White", "Gray"]
    }
  ],
  "specifications": [
    {
      "key": "Connectivity",
      "value": "2.4GHz Wireless"
    }
  ]
}

Response: 201 Created
{
  "message": "Product created successfully",
  "product": { ...created_product }
}
```

---

### 3. Cart Endpoints

#### Get Cart

```http
GET /orders/cart
Authorization: Bearer <token>

Response: 200 OK
{
  "cart": {
    "_id": "cartId",
    "items": [
      {
        "product": "productId",
        "quantity": 2,
        "price": 29.99
      }
    ],
    "subtotal": 59.98,
    "total": 75.48
  }
}
```

#### Add to Cart

```http
POST /orders/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "productId",
  "quantity": 2,
  "selectedOptions": [
    {
      "name": "Color",
      "value": "Black"
    }
  ]
}

Response: 201 Created
{
  "message": "Item added to cart",
  "cart": { ...updated_cart }
}
```

#### Update Cart Item

```http
PUT /orders/cart/[productId]
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}

Response: 200 OK
{
  "message": "Cart item updated",
  "cart": { ...updated_cart }
}
```

#### Remove from Cart

```http
DELETE /orders/cart/[productId]
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Item removed from cart",
  "cart": { ...updated_cart }
}
```

---

### 4. Order Endpoints

#### Create Order

```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "product": "productId",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "phone": "1234567890"
  },
  "billingAddress": { ...same_as_above },
  "paymentMethod": "card",
  "couponCode": "SAVE10",
  "selectedDeliverySlot": {
    "date": "2024-02-01",
    "startTime": "09:00",
    "endTime": "12:00"
  }
}

Response: 201 Created
{
  "message": "Order created successfully",
  "order": { ...order_object }
}
```

#### Get Orders

```http
GET /orders
Authorization: Bearer <token>

Response: 200 OK
{
  "orders": [ ...user_orders ]
}
```

#### Get Order Details

```http
GET /orders/[orderId]
Authorization: Bearer <token>

Response: 200 OK
{
  "order": { ...order_details }
}
```

#### Cancel Order

```http
POST /orders/[orderId]/cancel
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Order cancelled successfully",
  "order": { ...updated_order }
}
```

#### Request Refund

```http
POST /orders/refund/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "orderId",
  "reason": "Product is defective"
}

Response: 200 OK
{
  "message": "Refund request submitted",
  "order": { ...updated_order }
}
```

---

### 5. Admin Endpoints

#### Dashboard Stats

```http
GET /admin/dashboard
Authorization: Bearer <token>

Response: 200 OK
{
  "stats": {
    "totalUsers": 1520,
    "totalProducts": 450,
    "totalOrders": 3200,
    "totalVendors": 45
  },
  "recentOrders": [ ...last_10_orders ],
  "topProducts": [ ...top_10_products ]
}
```

#### Get All Users

```http
GET /admin/users?page=1&limit=20
Authorization: Bearer <token>

Response: 200 OK
{
  "users": [ ...users ],
  "pagination": { ...pagination_info }
}
```

#### Block User

```http
POST /admin/users/[userId]/block
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "User blocked successfully",
  "user": { ...updated_user }
}
```

#### Get Sales Analytics

```http
GET /admin/analytics/sales
Authorization: Bearer <token>

Response: 200 OK
{
  "analytics": {
    "totalRevenue": 125000.50,
    "totalOrders": 3200,
    "averageOrderValue": 39.06
  }
}
```

---

## Error Responses

```json
{
  "message": "Error description",
  "status": 400,
  "errors": [ {...validation_errors} ]
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

Default rate limits (can be configured):

- 100 requests per 15 minutes per IP
- 1000 requests per hour per authenticated user

---

## Pagination

All list endpoints support pagination:

```
?page=1&limit=10
```

Response includes:

```json
{
  "pagination": {
    "total": 100,
    "pages": 10,
    "currentPage": 1,
    "limit": 10
  }
}
```

---

## Filtering

Supported filters for products:

- `category` - Filter by category ID
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `rating` - Minimum rating (1-5)
- `search` - Search term
- `page` - Page number
- `limit` - Items per page

---

**Last Updated**: January 2024 **API Version**: 1.0.0
