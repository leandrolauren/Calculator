const { NextResponse } = require('next/server')

function middleware(request) {
  const token = request.cookies.get('authToken')

  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

module.exports = {
  middleware,
  config: {
    matcher: ['/dashboard/:path*', '/stock/:path*', '/calculator/:path*'],
  },
}
