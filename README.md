# Timex Solutions Payment Backend

A secure payment processing backend API built with Express.js and Square Web Payments SDK.

## Features
- Square Web Payments integration
- CORS enabled for frontend communication
- Environment-based configuration
- Payment processing with validation
- Health check endpoints

## Setup
1. Install dependencies: `npm install`
2. Copy environment: `cp env.example .env`
3. Add your Square credentials to `.env`
4. Start server: `npm run dev`

## Endpoints
- `GET /config` - Square configuration
- `POST /create-payment` - Process payments
- `GET /health` - Health check

## Environment
- Sandbox mode for testing
- Production ready configuration
