# 🚀 Timex Solutions Payment Backend

A secure, production-ready payment processing backend API built with **Express.js** and **Square Web Payments SDK**. This backend handles payment transactions, configuration management, and provides secure API endpoints for the Timex Solutions frontend application.

## 🏗️ **Project Overview**

**Repository**: https://github.com/MianKashif2534/TIMEXBACKEND.git  
**Version**: 1.0.0  
**Author**: Timex Solutions  
**License**: MIT  

### **Technology Stack**
- **Runtime**: Node.js (>=18.0.0)
- **Framework**: Express.js 5.1.0
- **Payment Gateway**: Square Web Payments SDK
- **Environment**: Sandbox & Production ready
- **CORS**: Enabled for frontend communication

## ⭐ **Key Features**

### 🔐 **Payment Processing**
- ✅ Square Web Payments SDK integration
- ✅ Credit card tokenization and processing
- ✅ Sandbox and production environment support
- ✅ Payment validation and error handling
- ✅ Transaction logging and monitoring

### 🛡️ **Security & Configuration**
- ✅ Environment-based configuration
- ✅ CORS protection for frontend communication
- ✅ Input validation and sanitization
- ✅ Secure credential management
- ✅ Production-ready security headers

### 📡 **API Endpoints**
- ✅ RESTful API design
- ✅ JSON request/response format
- ✅ Comprehensive error handling
- ✅ Health monitoring endpoints

## 📁 **Project Structure**

```
timex-payments-backend/
├── server.js              # Main Express server application
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── env.example            # Environment variables template
├── .env                   # Environment variables (not in git)
├── .gitignore            # Git ignore patterns
├── README.md             # This documentation
└── node_modules/         # Dependencies (not in git)
```

## 🚀 **Quick Start Guide**

### **Prerequisites**
- Node.js 18.0.0 or higher
- npm or yarn package manager
- Square Developer Account
- Git (for cloning)

### **1. Clone Repository**
```bash
git clone https://github.com/MianKashif2534/TIMEXBACKEND.git
cd TIMEXBACKEND
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Setup**
```bash
# Copy environment template
cp env.example .env

# Edit environment variables
nano .env  # or use your preferred editor
```

### **4. Configure Square Credentials**
Add your Square credentials to `.env`:
```env
# Square Web Payments SDK Configuration
SQUARE_APP_ID=sandbox-sq0idb-YOUR_APP_ID_HERE
SQUARE_ACCESS_TOKEN=YOUR_ACCESS_TOKEN_HERE
SQUARE_LOCATION_ID=YOUR_LOCATION_ID_HERE
SQUARE_ENV=sandbox

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### **5. Start Development Server**
```bash
npm run dev
```

### **6. Verify Installation**
```bash
# Health check
curl http://localhost:3001/health

# Configuration check
curl http://localhost:3001/config
```

## 📚 **API Documentation**

### **Base URL**
- **Development**: `http://localhost:3001`
- **Production**: `https://your-domain.com`

### **Endpoints**

#### **GET /** 
**Description**: Root endpoint with API information  
**Response**:
```json
{
  "message": "Timex Solutions Payment API",
  "version": "1.0.0",
  "environment": "development"
}
```

#### **GET /health**
**Description**: Health check endpoint  
**Response**:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "development",
  "squareEnv": "sandbox"
}
```

#### **GET /config**
**Description**: Square configuration for frontend  
**Response**:
```json
{
  "appId": "sandbox-sq0idb-...",
  "locationId": "LOCATION_ID",
  "environment": "sandbox"
}
```

#### **POST /create-payment**
**Description**: Process payment using Square  
**Request Body**:
```json
{
  "sourceId": "card_token_from_square",
  "amount": "10.00",
  "customerName": "John Doe",
  "customerEmail": "john@example.com"
}
```
**Response**:
```json
{
  "success": true,
  "paymentId": "payment_id",
  "status": "COMPLETED",
  "amount": "10.00",
  "customerName": "John Doe",
  "customerEmail": "john@example.com"
}
```

## 🧪 **Testing**

### **Test Credit Cards (Sandbox)**
```
Visa Success: 4111 1111 1111 1111
Expiry: 12/25, CVV: 123

Mastercard Success: 5555 5555 5555 4444
Expiry: 12/25, CVV: 123

American Express: 378282246310005
Expiry: 12/25, CVV: 1234

Declined Card: 4000 0000 0000 0002
Insufficient Funds: 4000 0000 0000 9995
```

### **Testing Endpoints**
```bash
# Test payment creation
curl -X POST http://localhost:3001/create-payment \
  -H "Content-Type: application/json" \
  -d '{
    "sourceId": "test_card_token",
    "amount": "10.00",
    "customerName": "Test User",
    "customerEmail": "test@example.com"
  }'
```

## 🔧 **Configuration**

### **Environment Variables**

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SQUARE_APP_ID` | Square Application ID | ✅ Yes | - |
| `SQUARE_ACCESS_TOKEN` | Square Access Token | ✅ Yes | - |
| `SQUARE_LOCATION_ID` | Square Location ID | ✅ Yes | - |
| `SQUARE_ENV` | Square Environment | ✅ Yes | sandbox |
| `PORT` | Server Port | ❌ No | 3001 |
| `NODE_ENV` | Node Environment | ❌ No | development |
| `FRONTEND_URL` | Frontend URL for CORS | ❌ No | http://localhost:5173 |

### **CORS Configuration**
- **Development**: Allows `localhost:5173` and `localhost:3000`
- **Production**: Uses `FRONTEND_URL` environment variable

## 🚀 **Deployment**

### **Production Environment Setup**
```env
# Production configuration
NODE_ENV=production
PORT=3001
SQUARE_ENV=production
FRONTEND_URL=https://yourdomain.com

# Production Square credentials
SQUARE_APP_ID=your_production_app_id
SQUARE_ACCESS_TOKEN=your_production_access_token
SQUARE_LOCATION_ID=your_production_location_id
```

### **Deployment Platforms**
- **Heroku**: Ready for deployment
- **AWS EC2**: Compatible
- **DigitalOcean**: Supported
- **Vercel**: Backend deployment ready

### **Production Deployment Commands**
```bash
# Build for production
npm run start

# Using PM2
pm2 start server.js --name "timex-payments"

# Using Docker (if Dockerfile exists)
docker build -t timex-payments .
docker run -p 3001:3001 timex-payments
```

## 🔒 **Security**

### **Security Features**
- ✅ Environment variable protection
- ✅ CORS configuration
- ✅ Input validation
- ✅ Secure headers
- ✅ No sensitive data in responses

### **Security Best Practices**
- Never commit `.env` file
- Use HTTPS in production
- Regular dependency updates
- Monitor payment transactions
- Implement rate limiting (optional)

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Port Already in Use**
```bash
# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 <PID>
```

#### **Square Configuration Error**
- Verify Square credentials in `.env`
- Check Square environment (sandbox/production)
- Ensure Square application is properly configured

#### **CORS Errors**
- Check `FRONTEND_URL` in `.env`
- Verify frontend URL matches CORS configuration

### **Debug Mode**
```bash
# Enable detailed logging
DEBUG=* npm run dev
```

## 📞 **Support & Contact**

- **Developer**: Timex Solutions Team
- **Email**: support@timexsolutions.com
- **Repository**: https://github.com/MianKashif2534/TIMEXBACKEND.git
- **Issues**: Create GitHub issue for bug reports

## 📄 **License**

MIT License - see LICENSE file for details.

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📊 **Project Status**

- ✅ **Square Integration**: Complete
- ✅ **Payment Processing**: Functional
- ✅ **API Endpoints**: Complete
- ✅ **Error Handling**: Implemented
- ✅ **Documentation**: Complete
- ✅ **Production Ready**: Yes

---

**Built with ❤️ by Timex Solutions Team**