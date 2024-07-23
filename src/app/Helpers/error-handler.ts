import { HttpErrorResponse } from '@angular/common/http';

export function handleError(error: HttpErrorResponse): string {
  let errorMessage = 'An unknown error occurred';

  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = error.error.message;
  } else {
    // Server-side error
    if (error.status === 0) {
      // A status of 0 indicates a network error
      errorMessage = 'No internet connection. Please check your network and try again.';
    } else {
      // Handle other server-side errors
      errorMessage = error.error.message || errorMessage;
    }
  }

  return errorMessage;
}
