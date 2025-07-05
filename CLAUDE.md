# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack web application for managing orders at Pins de México. It replaces manual Excel-based order tracking with a modern web application featuring real-time metrics, order management, and Excel export capabilities.

**Stack:**
- Frontend: Angular 16 with Angular Material and Tailwind CSS
- Backend: .NET 7 Web API with Entity Framework Core
- Database: Azure SQL Database
- Authentication: Auth0 (Google/Microsoft login)
- Deployment: Azure Static Web Apps

## Development Commands

### Frontend (Angular)
```bash
# Install dependencies
npm install

# Development server (opens browser automatically)
npm start
# or
ng serve -o

# Staging environment
npm run start:staging

# Build for production
npm run build:prod

# Build for development
ng build

# Run tests
npm test
# or
ng test

# Watch mode for development
npm run watch
```

### Backend (.NET)
```bash
# Run the API locally
cd backend/PinsMexico
dotnet run

# Run tests
cd backend/PinsMexico.Tests
dotnet test

# Build the project
dotnet build

# Restore packages
dotnet restore
```

## Architecture Overview

### Frontend Structure
- **Components**: Located in `src/app/components/`
  - `home/`: Dashboard with metrics and order grid
  - `login/`: Auth0 authentication
  - `order-form/`: Create/edit orders
  - `orders-grid/`: Order listing and management
  - `metrics/`: Dashboard metrics display
  - `navbar/` and `footer/`: Layout components
- **Services**: Located in `src/app/components/services/`
  - `order.service.ts`: Order CRUD operations
  - `status.service.ts`: Order status management
  - `metric.service.ts`: Dashboard metrics
- **Models**: Located in `src/app/models/`
  - `order.ts`, `status.ts`, `metric.ts`
- **Environments**: Different configs for dev/staging/production

### Backend Structure
- **Controllers**: Located in `backend/PinsMexico/Controllers/`
  - `OrdersController.cs`: Order CRUD endpoints
  - `StatusController.cs`: Status management
  - `MetricsController.cs`: Dashboard metrics calculation
- **Entities**: Located in `backend/PinsMexico/Entities/`
  - `Order.cs`, `Status.cs`, `Metric.cs`
- **Database**: `MyDbContext.cs` - Entity Framework Core context

### Key Features
- **Order Management**: Create, edit, and track orders with various statuses
- **Dashboard Metrics**: Real-time metrics for last 30 days (pending orders, revenue, tax calculations)
- **Excel Export**: Export order data to Excel using xlsx library
- **Authentication**: Auth0 integration for Google/Microsoft SSO
- **Responsive Design**: Angular Material + Tailwind CSS

## Environment Configuration

The application uses different environment files:
- `environment.ts`: Development (API at localhost:7037)
- `environment.staging.ts`: Staging environment
- `environment.production.ts`: Production environment

Auth0 configuration is included in environment files with domain and client ID.

## Database Schema

The application uses Entity Framework Core with:
- **Orders**: Main order entity with status tracking
- **Status**: Order status reference table
- **Metrics**: Calculated metrics (keyless entity for dashboard)

## Common Development Tasks

### Running Full Stack Locally
1. Start the .NET API: `cd backend/PinsMexico && dotnet run`
2. Start Angular dev server: `npm start`
3. Application will be available at `http://localhost:4200`

### Adding New Features
- Frontend components follow Angular Material design patterns
- Backend follows RESTful API conventions
- Database changes require Entity Framework migrations

### Testing
- Frontend: Uses Jasmine/Karma testing framework
- Backend: Uses .NET testing framework in `PinsMexico.Tests`

## Deployment

The application uses Azure Static Web Apps with automated CI/CD. Commits to the main branch trigger automatic deployment to the production environment at `https://red-glacier-0eeeea010.3.azurestaticapps.net`.