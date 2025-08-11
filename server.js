import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client, Environment } from 'square';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration for production
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://www.timexsolutioninc.com/'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Initialize Square client
const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
});

// GET /config - Returns Square configuration for frontend
app.get('/config', (req, res) => {
  try {
    console.log('DEBUG - Environment variables:');
    console.log('SQUARE_APP_ID:', process.env.SQUARE_APP_ID);
    console.log('SQUARE_LOCATION_ID:', process.env.SQUARE_LOCATION_ID);
    console.log('SQUARE_ENV:', process.env.SQUARE_ENV);
    
    res.json({
      appId: process.env.SQUARE_APP_ID,
      locationId: process.env.SQUARE_LOCATION_ID,
      environment: process.env.SQUARE_ENV || 'sandbox'
    });
  } catch (error) {
    console.error('Config error:', error);
    res.status(500).json({ error: 'Failed to load configuration' });
  }
});

// POST /create-payment - Creates payment using Square
app.post('/create-payment', async (req, res) => {
  try {
    const { sourceId, amount, customerName, customerEmail } = req.body;

    // Validate required fields
    if (!sourceId || !amount || !customerName || !customerEmail) {
      return res.status(400).json({
        error: 'Missing required fields: sourceId, amount, customerName, customerEmail'
      });
    }

    // Validate amount
    const amountInCents = Math.round(parseFloat(amount) * 100);
    if (amountInCents <= 0) {
      return res.status(400).json({
        error: 'Invalid amount. Must be greater than 0.'
      });
    }

    // Create payment using Square
    const response = await squareClient.paymentsApi.createPayment({
      sourceId: sourceId,
      amountMoney: {
        amount: amountInCents,
        currency: 'USD'
      },
      autocomplete: true,
      note: `Payment for ${customerName} (${customerEmail})`,
      customerId: customerEmail, // Using email as customer ID for simplicity
    });

    console.log('Payment successful:', {
      paymentId: response.result.payment.id,
      amount: amount,
      customer: customerName
    });

    res.json({
      success: true,
      paymentId: response.result.payment.id,
      status: response.result.payment.status,
      amount: amount,
      customerName: customerName,
      customerEmail: customerEmail
    });

  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({
      error: 'Payment failed',
      details: error.message || 'Unknown error occurred'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    squareEnv: process.env.SQUARE_ENV || 'sandbox'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Timex Solutions Payment API',
    version: '1.0.0',
    environment: NODE_ENV
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Timex Solutions Payment Server running on port ${PORT}`);
  console.log(`📱 Environment: ${NODE_ENV}`);
  console.log(`🏪 Square Environment: ${process.env.SQUARE_ENV || 'sandbox'}`);
  console.log(`🌐 CORS Origins: ${corsOptions.origin.join(', ')}`);
}); 