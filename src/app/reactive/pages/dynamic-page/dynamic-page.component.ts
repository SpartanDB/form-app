import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Halo', Validators.required],
      ['Death Stranding', Validators.required],
      ['Zelda', Validators.required],
    ]),
  });

  public newFavoriteGame: FormControl = new FormControl(
    '',
    Validators.required
  );

  constructor(private fb: FormBuilder) {}

  get favoriteGamesArr() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  isValidFieldArr(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  getFielError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio';
        case 'minlength':
          return `Este campo debe ser al menos ${errors['minlength'].requiredLength} caracteres `;
        case 'min':
          return 'Este campo debe ser 0 o mayor';
        default:
          return 'Error no identificado';
      }
    }

    return null;
  }

  onAddFavoriteGame(): void {
    if (this.newFavoriteGame.invalid) {
      this.newFavoriteGame.markAsTouched();
      return;
    }

    const newFavoriteGame = this.newFavoriteGame.value;

    this.favoriteGamesArr.push(
      this.fb.control(newFavoriteGame, Validators.required)
    );

    this.newFavoriteGame.reset();
  }

  onDeleteFavoriteGame(index: number): void {
    this.favoriteGamesArr.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
    this.favoriteGamesArr.clear();
  }
}
