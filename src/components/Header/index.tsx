import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

export default async function Header() {
  return (
    <nav>
      <Link href="/dashboard" className="link">
        My Coins
      </Link>
      <Link href="/trades" className="link">
        Trades
      </Link>
      <LogoutButton />
    </nav>
  )
}
