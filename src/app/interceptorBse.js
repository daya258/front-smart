import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';

// Rxjs
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

// Servicios
import { ControlarMensajesService } from '@shared/utils';

// Constantes
import { MENSAJE_ERROR_GENERAL } from '@configs/constants';

// enum
enum Response {
    Ok = 'OK',
        Error = 'ERROR',
        NotContent = 'NOT_CONTENT',
}

@Injectable()
export class ValidarRespuestaInterceptor implements HttpInterceptor {
    constructor(private controlarMensajesService: ControlarMensajesService) {}

    /**
     * @description Este metodo realizaría el llamado a spluck para guaradar los errores
     * @author Sebastián Bermúdez <sbermude@cotrafa.com.co>
     * @date 2020-06-02
     * @private
     * @param {HttpErrorResponse} error
     * @returns
     * @memberof ValidarRespuestaInterceptor
     */
    private handleError(error: HttpErrorResponse) {
        // Llamar a splunk para guardar el log del error
        return throwError(error);
    }

    /**
     * @description Intercepta errores del servidor y muestra una alerta, en desarrollo imprime el error
     * @author Sebastián Bermúdez <sbermude@cotrafa.com.co>
     * @date 2020-06-02
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     * @memberof ValidarRespuestaInterceptor
     */
    public intercept(
        request: HttpRequest < any > ,
        next: HttpHandler
    ): Observable < HttpEvent < any >> {
        return next.handle(request).pipe(
            retry(1),
            map((evento: HttpEvent < any > ) => this.validarRespuesta(evento)),
            catchError((error) => {
                this.mostarAlertaConError(error);
                return this.handleError(error);
            })
        );
    }

    /**
     * @description Muestra una alerta de error al usuario.
     * Sí dentro del error existe la propiedad textError,
     * se muestra en la alerta la propiedad mensaje de la repuesta del servidor,
     * si no un error general
     * @author Sebastián Bermúdez <sbermude@cotrafa.com.co>
     * @date 2020-06-10
     * @private
     * @param {*} error
     * @memberof ValidarRespuestaInterceptor
     */
    private mostarAlertaConError(error): void {
        const errorMostarAlerta = (error.hasOwnProperty('error') && error.error && error.error.hasOwnProperty('textError')) ?
            error.error.textError :
            MENSAJE_ERROR_GENERAL;
        this.controlarMensajesService.mensajePersonalizado(
            'error',
            errorMostarAlerta
        );
    }

    /**
     * @description Se valida si dentro del cuerpo de la respuesta del servidor
     * la propiedad codigo es igual a ERROR, para emitir un HttpErrorResponse que notifique
     * al componente que deben manejar el error.
     * Este HttpErrorResponse que se emite, no es un error propio de la petición
     * si no, logica de negocio de cotrafa. Ejemplo si se va crear un producto y no se puede porque
     * el usuario ya lo tiene, el servidor responde un 200 a la petición pero dentro de su body la propiedad codigo
     * es igual a ERROR y en el la propiedad mensaje trae el texto que se debe  mostrar al usuario. Cómo vemos
     * No es un error propio d ela peticón pero si de validaciones de negocio.
     * @author Sebastián Bermúdez <sbermude@cotrafa.com.co>
     * @date 2020-06-10
     * @private
     * @param {HttpEvent<any>} evento
     * @returns {HttpEvent<any>}
     * @memberof ValidarRespuestaInterceptor
     */
    private validarRespuesta(evento: HttpEvent < any > ): HttpEvent < any > {
        if (
            evento instanceof HttpResponse &&
            evento &&
            evento.hasOwnProperty('body') &&
            (!evento.body ||
                evento.body.hasOwnProperty('codigo') &&
                evento.body.codigo &&
                evento.body.codigo === Response.Error)
        ) {
            throw new HttpErrorResponse({
                error: {
                    codeError: (
                        evento.body && evento.body.hasOwnProperty('codigo') && evento.body.codigo
                    ) ? evento.body.codigo : Response.Error,
                    textError: (
                        evento.body && evento.body.hasOwnProperty('mensaje') && evento.body.mensaje
                    ) ? evento.body.mensaje : MENSAJE_ERROR_GENERAL,
                },
                headers: evento.headers,
                status: evento.status,
                statusText: evento.statusText,
                url: evento.url,
            });
        } else {
            return evento;
        }
    }
}