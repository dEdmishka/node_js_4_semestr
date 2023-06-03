export interface UsersDto {
    id: string
    username: string
    email: string
    age: number
    info?: string
    address: { city: string, street: string}
}