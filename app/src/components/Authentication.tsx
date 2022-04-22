/* eslint-disable @typescript-eslint/no-unused-vars */
import { Administrator, Authentication, BaseUser, Ordinary } from "../types";



function createAuthentication<T extends BaseUser>() {
    return class User implements Authentication<T> {
        public isAuthenticated = false;

        public async signIn(user: T): Promise<T> {
            // call user authentication
            const data = await fetch('/authenticate', {
                method: 'POST',
                body: JSON.stringify(user.credentials),
            })

            const resultUser = (await data.json()) as T

            this.isAuthenticated = true;
            user.accessToken = resultUser.accessToken

            return (await data.json()) as T
        }

        public signOut(user: T): void {
            this.isAuthenticated = false;
            user.accessToken = null;
        }
    }
}



const AdminAuth = createAuthentication<Administrator>()
const adminAuth = new AdminAuth()

adminAuth.signIn({
    id: 'adm.1234',
    name: 'Cesar Admin',
    accessToken: 'adm.token.1234',
    credentials: {
        username: 'cesar.admin',
        password: '1234'
    },
    roles: []
})

const OrdinaryAuth = createAuthentication<Ordinary>()
const ordinaryAuth = new OrdinaryAuth()

ordinaryAuth.signOut({
    id: '1234',
    name: 'Cesar',
    accessToken: '1234',
    credentials: {
        username: 'cesar',
        password: '1234'
    },
    tasks: []
})