import { NextRequest, NextResponse } from 'next/server'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import db from '../../lib/db'

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'uploads')
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }
      cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const mobile = formData.get('mobile') as string
    const email = formData.get('email') as string
    const age = parseInt(formData.get('age') as string)
    const clubName = formData.get('clubName') as string
    const paymentScreenshot = formData.get('paymentScreenshot') as File

    if (!name || !mobile || !email || !age || !clubName || !paymentScreenshot) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Save file
    const uploadDir = path.join(process.cwd(), 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(paymentScreenshot.name)
    const filePath = path.join(uploadDir, fileName)

    const buffer = Buffer.from(await paymentScreenshot.arrayBuffer())
    fs.writeFileSync(filePath, buffer)

    // Save to database
    const stmt = db.prepare(`
      INSERT INTO registrations (name, mobile, email, age, clubName, paymentScreenshot)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    stmt.run(name, mobile, email, age, clubName, fileName)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error registering:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}