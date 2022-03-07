export interface IAuthedUser {
    accessToken: string;
    idToken: string;
    scope: string;
    tokenType: string;

    email: string;
    emailVerified: string;
    picture: string;

    atHash: string;
    /**
     * Audience or OAuth 2.0 client that is the intended recipient of the token
     */
    aud: string;
    /**
     * Authorized party: client ID of the application which is being authorized. Currently the same as aud
     */
    azp: string;
    /**
     * Expiration time (note that when the JWT ID tokens expire, they cannot be refreshed)
     */
    exp: number;
    /**
     * Issuance time
     */
    iat: number;
    /**
     * Token issuer (Twitch)
     */
    iss: string;
    /**
     * Logged in users' username
     */
    preferredUsername: string;
    /**
     * Subject or end-user identifier
     */
    sub: string;
    /**
     * Value optionally specified in the request
     */
    nonce?: string
}

