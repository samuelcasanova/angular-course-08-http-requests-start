import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.includes('protected')) {
      const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'abcdefghijklmn')})
      console.log(`Sending authenticated ${req.method} request to ${req.url}`)
      return next.handle(modifiedRequest).pipe(tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Response arrived with status ', event.status)
        }
      }))
    }
  }

}