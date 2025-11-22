import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produit vers Publication Facebook',
  description: 'Transformez vos images de produits en publications Facebook',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
