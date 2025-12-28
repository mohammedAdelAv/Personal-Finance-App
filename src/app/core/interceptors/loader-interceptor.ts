import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../../services/busy.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const busy = inject(BusyService);

  busy.busy();
  return next(req).pipe(finalize(() => busy.hide()));
};
