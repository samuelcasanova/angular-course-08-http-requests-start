import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.includes('protected')) {
      console.log(`Sending authenticated ${req.method} request to ${req.url}`)
      return next.handle(req)
    }
  }

}