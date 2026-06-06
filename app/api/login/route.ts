import { NextResponse } from 'next/server';
import { setSession } from '../../_lib/session';
import path from 'path';
import fs from 'fs';

type LoginPayload = { email?: string; password?: string };

export async function POST(request: Request) {
  try {
    const body: LoginPayload = await request.json().catch(() => ({}));
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ ok: false, message: 'Email and password required' }, { status: 400 });
    }

    const dbPath = path.join(process.cwd(), 'app', '_data', 'db.json');
    const raw = await fs.promises.readFile(dbPath, 'utf-8');
    const db = JSON.parse(raw);
    const users = Array.isArray(db.users) ? db.users : [];

    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // normalize user shape
    const userPayload = {
      id: Number(user.id),
      name: user.name,
      email: user.email,
    };

    try {
      await setSession(userPayload as any);
    } catch (err) {
      console.error('setSession failed', err);
    }

    return NextResponse.json({ ok: true, user: userPayload });
  } catch (err) {
    console.error('Login route error', err);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
