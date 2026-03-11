export class RefreshTokenQuery implements IQuery<{ accessToken: string; newRefreshToken: string }> {
    constructor(public readonly refreshToken: string) {}
}