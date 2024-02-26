import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(`Sending ${req.method} request to ${req.url}`)
    return next.handle(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(`Response arrived with status ${event.status}`)
      }
    }))
  }
}