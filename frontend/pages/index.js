import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'
import { RoleContext } from '../contexts/RoleContext'

export default function Home() {
  const { role } = useContext(RoleContext)

  return (
    <>
      <Head>
        <title>MyEfrei - Accueil</title>
        <meta name="description" content="Page d'accueil de MyEfrei clone" />
      </Head>
      <div style={{ padding: '1rem' }}>
        <h1>Bienvenue sur MyEfrei</h1>
        <p>Vous êtes connecté en tant que <strong>{role}</strong>.</p>
        <h2>Accès rapide</h2>
        <ul>
          <li><Link href="/students">Étudiants</Link></li>
          <li><Link href="/teachers">Profs</Link></li>
          <li><Link href="/notes">Notes</Link></li>
          <li><Link href="/planning">Planning</Link></li>
        </ul>
      </div>
    </>
  )
}
