import { NextResponse } from 'next/server';
import { query } from '@lib/db';

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        name,
        symbol,
        CONCAT('$', CAST(price AS VARCHAR)) as price,
        CAST(holdings AS VARCHAR) as holdings
      FROM stocks
      ORDER BY price DESC
    `);

    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stocks' },
      { status: 500 }
    );
  }
} 