import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('firebasedatabase')) {
      const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'abcdefghijklmn')})
      return next.handle(modifiedRequest)
    }
    return next.handle(req)
  }
}