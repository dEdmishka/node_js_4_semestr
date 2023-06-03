export interface UsersDtoResponse {
    id: string
    username: string
    email: string
    age: number
    info?: string
    address: { city: string, street: string },
    posts: {
        id: string,
        created_at: string
        title: string,
        text: string
    }[]
}