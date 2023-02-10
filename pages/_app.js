import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
   
    return (
    <ClerkProvider>
        <SignedIn>
            <Component {...pageProps} loggedIn={true} />
        </SignedIn>
        <SignedOut>
            <Component {...pageProps} />
        </SignedOut>
    </ClerkProvider>
    )
}

export default MyApp
