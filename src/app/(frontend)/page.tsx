import React from 'react'

export const dynamic = 'force-dynamic'

export const revalidate = 0

export default async function HomePage() {
  return (
    <div className="home">
      <div className="title">
        <h1>Home (Logged in)</h1>
      </div>
    </div>
  )
}
