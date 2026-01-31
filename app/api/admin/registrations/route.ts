import { NextRequest, NextResponse } from 'next/server'
import db from '../../../lib/db'

export async function GET(request: NextRequest) {
  try {
    const stmt = db.prepare('SELECT * FROM registrations ORDER BY createdAt DESC')
    const registrations = stmt.all()

    return NextResponse.json(registrations, { status: 200 })
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}