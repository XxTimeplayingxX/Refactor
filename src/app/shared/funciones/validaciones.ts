import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function primeraLetraMayuscula(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = <string>control.value;

    if (!valor) return null;
    if (valor.length === 0) return null;

    const primeraLetra = valor[0];

    if (primeraLetra !== primeraLetra.toUpperCase()) {
      return {
        //Esta es nuestra llave, al igual que se busca nombre.HasError('required')
        //El 'required es la llave
        primeraLetraMayuscula: {
          mensaje: 'La primera letra debe ser mayúscula',
        },
      };
    }

    return null;
  };
}

export function soloTelefono(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = <string>control.value;

    if (!valor) return null;
    if (valor.length === 0) return null;

    if (isNaN(Number(valor))) {
      return {
        soloTelefono: {
          mensaje: 'No debe de contener letras',
        },
      };
    }
    return null;
  };
}

export function soloNumeros():ValidatorFn{
  return(control:AbstractControl):ValidationErrors | null=>{
    const valor = <number>control.value;

    if(!valor) return null;

    if (isNaN(valor)) {
      return {
        soloTelefono: {
          mensaje: 'No debe de contener letras',
        },
      };
    }
    return null;
  }
}

export function soloNumerosPositivos():ValidatorFn{
  return(control:AbstractControl):ValidationErrors | null=>{
    const valor = <number>control.value;

    if(!valor) return null;

    if(valor <= 0){
      return {
        soloNumerosPositivos:{
          mensaje: 'Solo números positivos'
        }
      }
    }
    return null;
  }
}

export function LongitudCampo(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let length = 10;
    const valor = <string>control.value;

    if (!valor) return null;
    if (valor.length < 10) {
      return {
        LongitudCampo: {
          mensaje: `El campo tiene que tener ${length} caracteres`,
        },
      };
    }
    return null;
  };
}

export function FechaValidacion(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = <string>control.value;

    const fechaIngresada = new Date(valor);
    const fechaActual = new Date();

    // Comparar solo fechas (ignorar la hora)
    fechaActual.setHours(0, 0, 0, 0);
    fechaIngresada.setHours(0, 0, 0, 0);

    if(!valor) return null;

    if (fechaIngresada < fechaActual) {
      return {
        FechaValidacion: {
          mensaje: 'La fecha elegida no puede ser menor a la fecha actual.',
        },
      };
    }

    return null;
  };
}



