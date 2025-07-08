import { environment } from "../../environments/environment"

export default {
  auth: {
    domain: environment.auth0Domain,
    clientId: environment.auth0ClientId,
    authorizationParams: {
      redirect_uri: "http://localhost:4200",
      audience: "http://localhost:8080",
    },
  },
  httpInterceptor: {
    allowedList: [
      'http://localhost:8080/api/orders/**',
      'http://localhost:8080/api/checkout/purchase'
    ],
  }
}
