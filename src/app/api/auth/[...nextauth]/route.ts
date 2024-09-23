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
                console.log(res);
                
                if (res.code ) {
                  return { id:"",email: res.data.token,name: res.data.name}
                }else{
                  throw new Error(res?.message);
                }
              }

              
              return null
            }
          })
      ],
      session:{
        maxAge: 7*24*60*60
      }
})

export { handler as GET, handler as POST }