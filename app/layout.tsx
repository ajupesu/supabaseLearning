import './globals.css'
import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Button } from '@mui/material'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { user },
    } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body>
        <main>
        <nav>
        <div>
          {user ? (
            <div>
              Hey, {user.email}!
              <Button/>
            </div>
          ) : (
            <Link
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
          {children}
        </main>
      </body>
    </html>
  )
}