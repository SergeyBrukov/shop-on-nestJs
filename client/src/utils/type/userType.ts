export type TUser = {
    id: string
    name: string
    email: string
}

export type TResponseUserData = {
    user: TUser
    token: string
}