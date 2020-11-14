import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Http Interceptor');
        let requestMethods = 'requestMethods';
        let requestOrigins = 'requestOrigins';
        let requestHeaders = 'requestHeaders';
        let contentType = 'application/json';

        const token = 'Bearer $2a$07$asxx54ahjppf45sd87a5auXBm1Vr2M1NV5t/zNQtGHGpS5fFirrbG';

        if (requestMethods) {
            requestMethods = '*';
        }

        if (requestOrigins) {
            requestOrigins = '*';
        }

        if (requestHeaders) {
            requestHeaders = '*';
        }
        
        if (contentType) {
            contentType = 'application/json';
        }

        req = req.clone({
            setHeaders: {
                Athorization: token,
                'Access-Control-Allow-Methods': requestMethods,
                'Access-Control-Allow-Origin': requestOrigins,
                'Access-Control-Allow-Headers': requestHeaders,
                'Conten-Type': contentType

            }
        });
        return next.handle(req);
    }
}