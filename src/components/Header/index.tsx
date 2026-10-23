'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

const links = [
  { href: '/dashboard', label: 'Visão geral', icon: 'overview' },
  { href: '/trades', label: 'Operações', icon: 'trades' },
] as const

function NavIcon({ name }: { name: 'overview' | 'trades' }) {
  return name === 'overview' ? (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1.5" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" />
      <rect x="11.5" y="11.5" width="6" height="6" rx="1.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5.5h14M3 10h14M3 14.5h14" />
      <circle cx="6" cy="5.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="13" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="8" cy="14.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Header() {
  const pathname = usePathname()

  return (
    <aside className="sidebar" aria-label="Navegação principal">
      <Link className="brand" href="/dashboard" aria-label="My Coins, visão geral">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>my coins</span>
        <span className="brand-chevron" aria-hidden="true">
          ⌄
        </span>
      </Link>

      <div className="sidebar-group-label">WORKSPACE</div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname === link.href ? 'active' : ''}`}
            aria-current={pathname === link.href ? 'page' : undefined}
          >
            <NavIcon name={link.icon} />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-label">CARTEIRA PESSOAL</div>
        <LogoutButton />
      </div>
    </aside>
  )
}
