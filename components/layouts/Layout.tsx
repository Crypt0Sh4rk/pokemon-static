import Head from "next/head"
import { FC } from "react"
import { Navbar } from '../ui/';

interface LayoutProps {
    children: React.ReactNode,
    title?: string,
}

const origin = ( typeof window === 'undefined' ) ? '' : window.location.origin;

// export const Layout = ({ children, title }:LayoutProps) => {
export const Layout: FC<LayoutProps> = ({ children, title }) => {


    return (
        <>
            <Head>
                <title>{title || ' App'}</title>
                <meta name="author" content="Isaias Manuel" />
                <meta name="description" content={`Información sobre el pokemon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />

                <meta property="og:title" content={`Información sobre ${ title }`} />
                <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
                <meta property="og:image" content={`${ origin }/img/banner.png`} />
            </Head>

            {/* Navbar */}
            <Navbar />

            <main style={{
                padding: '0x 20px'
            }}>
                {children}
            </main>
        </>
    )
}
