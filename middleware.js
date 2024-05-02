import { NextResponse } from "next/server"
import { cookies } from "next/headers";

const getBackendData = async (url) => {
    const res = await fetch(url, {

    });
    const data = await res.json();
    console.log(data);
    return data;
}

export async function middleware(req, res) {
    const cookieStore = cookies()
    const token = cookieStore.get('token') || '';
    const ApiResponse = await fetch('http://localhost:5000/user/authorise', {
        headers: {
            'x-auth-token': token.value
        }
    });
    console.log(ApiResponse.status);
    if (ApiResponse.status !== 200) {
        return NextResponse.redirect(new URL('/authenticate', req.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: '/admin/manageproduct'
}