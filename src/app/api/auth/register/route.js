import { NextResponse } from 'next/server';
import prisma from "../../../../utils/prismadb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'כל השדות נדרשים' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'משתמש עם אימייל זה כבר קיים' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'משתמש נרשם בהצלחה', user }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'שגיאה בעת הרשמת המשתמש', error: error.message }, { status: 500 });
  }
}