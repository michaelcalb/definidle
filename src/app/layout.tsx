import type { Metadata } from 'next'
import './globals.css'

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import Header from '@/components/Header/Header'

export const metadata: Metadata = {
	title: 'definidle',
	description: 'Guess the word by its definition',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<Header />
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
