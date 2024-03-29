import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
    const session = await getToken({ req,
        secret: 'mySecret' });

    if (!session) return NextResponse.redirect(`${process.env.BASE_URL}/login`);

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/courses',
        '/tasks',
        '/personal_plan',
        '/student_plan/:path*',
        '/course/:path*'
    ],
}