import { environment } from "../../environments/environment"

export default {
  auth: {
    domain: environment.auth0Domain,
    clientId: environment.auth0ClientId,
    authorizationParams: {
      redirect_uri: "https://localhost:4200",
      audience: "https://localhost:8443",
    },
  },
  httpInterceptor: {
    allowedList: [
      'https://localhost:8443/api/orders/**',
      'https://localhost:8443/api/checkout/purchase'
    ],
  }
}
