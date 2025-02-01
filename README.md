# Neutrade - Advanced Market Screener

A sophisticated market screening and trading terminal built with Next.js, featuring real-time data updates, PostgreSQL integration, and a modern terminal-inspired interface.

## Features

- Real-time market data updates
- Advanced stock screening capabilities
- PostgreSQL database integration
- Modern, terminal-inspired UI
- Responsive data tables with live updates
- Theme-aware design system

## Quick Start

1. Clone the repository:
```sh
git clone https://github.com/Shreyanshsum/tradingterminal.git
cd tradingterminal
```

2. Install dependencies:
```sh
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the PostgreSQL configuration in `.env`:
```sh
POSTGRES_USER=your_username
POSTGRES_HOST=localhost
POSTGRES_DB=stockdetails
POSTGRES_PASSWORD=your_password
POSTGRES_PORT=5432
```

4. Initialize the database:
- Run the SQL commands from `db/schema.sql` to set up your database schema

5. Start the development server:
```sh
npm run dev
```

Access the application at `http://localhost:3000`

## Database Schema

The application uses PostgreSQL with the following main table structure:

```sql
CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    holdings INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Technology Stack

- Next.js for the frontend and API routes
- PostgreSQL for data storage
- TypeScript for type safety
- SCSS modules for styling
- Real-time data updates with custom hooks

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

```sh
npm install
npm run dev
```