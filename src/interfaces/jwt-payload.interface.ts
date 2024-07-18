export interface IjwtPayload {
    iss: number; //emissor do token
    sub: number; //id do user
    aud: string; //service id
    exp: number; //expiration
    iat: number; //emitido em
    jti: string; //unique token id
    roles: string[]; //tipo do usuario
    permissions: string[]; // read|write|delete
}
