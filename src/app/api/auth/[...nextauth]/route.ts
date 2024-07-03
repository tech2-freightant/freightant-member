import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
              // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
              // (i.e., the request IP address)
              console.log(credentials);
              
              const res = await fetch("https://fakestoreapi.com/products/1")
              const user = await null
        
              // If no error and we have user data, return it
              if (res.ok ) {
                return { id: "1", name: ""}
              }
              // Return null if user data could not be retrieved
              return null
            }
          })
      ],
})

export { handler as GET, handler as POST }