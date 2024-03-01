import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log({ email });

  //   return of({
  //     emailExists: true,
  //   }).pipe(
  //     delay(2000) // Simulate a request to the server
  //   );
  // }
  //

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({ email });

    const httpCallObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        console.log({ email });

        if (email === 'correo@correo.com') {
          subscriber.next({ emailTaken: true });
          subscriber.complete();
          //return
        }

        subscriber.next(null);
        subscriber.complete();
      }
    ).pipe(
      delay(2000) // Simulate a request to the server
    );

    return httpCallObservable;
  }
}
