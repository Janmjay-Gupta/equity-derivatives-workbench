import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('API Request:', req.method, req.url);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          console.log('API Response:', event.status, req.url);
        }
      },
      error: (error: unknown) => {
        console.error('API Error:', req.url, error);
      },
    }),
  );
};
