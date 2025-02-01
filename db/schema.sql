-- Create stocks table
CREATE TABLE IF NOT EXISTS stocks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    holdings INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on symbol
CREATE INDEX IF NOT EXISTS idx_stocks_symbol ON stocks(symbol);

-- Sample data
INSERT INTO stocks (name, symbol, price, holdings) VALUES
    ('Apple Inc.', 'AAPL', 175.50, 1000),
    ('Microsoft Corporation', 'MSFT', 325.75, 800),
    ('Amazon.com Inc.', 'AMZN', 135.25, 600),
    ('Alphabet Inc.', 'GOOGL', 140.50, 400),
    ('NVIDIA Corporation', 'NVDA', 450.25, 300),
    ('Meta Platforms Inc.', 'META', 310.75, 500),
    ('Tesla Inc.', 'TSLA', 245.50, 700),
    ('Berkshire Hathaway', 'BRK.B', 355.25, 200),
    ('UnitedHealth Group', 'UNH', 485.75, 150),
    ('Johnson & Johnson', 'JNJ', 155.50, 900)
ON CONFLICT (symbol) DO UPDATE 
SET price = EXCLUDED.price,
    holdings = EXCLUDED.holdings,
    updated_at = CURRENT_TIMESTAMP; 