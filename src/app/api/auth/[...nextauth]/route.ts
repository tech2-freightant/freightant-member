import { loginEndPoint } from "@/network/endpoints";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: {},
              password: {},
            },
            async authorize(credentials, req) {
              console.log(credentials);
              if(credentials?.email && credentials?.password){                
                const res = await loginEndPoint({businessEmail:credentials?.email, password:credentials?.password})
                
                if (res.code ) {
                  return { id:"",email: res.data.token}
                }
              }
              return null
            }
          })
      ],
})

export { handler as GET, handler as POST }