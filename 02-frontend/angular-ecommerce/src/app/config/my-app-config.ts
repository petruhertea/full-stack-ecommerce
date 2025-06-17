import { environment } from "../../environments/environment";

export default {
    oidc: {
        clientId: environment.oktaClientId,
        issuer: environment.oktaIssuer,
        redirectUri: environment.oktaRedirectUri,
        scopes: ['openid', 'profile', 'email']
    }
}
