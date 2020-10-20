export interface Jwt {
    dataUser:{
        id:number,
        name:string,
        email: string,
        accessToken: string,
        expiresToken: string
    }
}
