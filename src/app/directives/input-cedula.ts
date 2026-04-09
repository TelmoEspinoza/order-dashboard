import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[cedulaEcuatoriana]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CedulaEcuatorianaValidatorDirective,
      multi: true
    }
  ]
})
export class CedulaEcuatorianaValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;

    if (!cedula) return null;

    if (!this.validarCedula(cedula)) {
      return { cedulaInvalida: true };
    }

    return null;
  }

  private validarCedula(cedula: string): boolean {
    if (!/^\d{10}$/.test(cedula)) return false;

    const provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 1 || provincia > 24) return false;

    const tercerDigito = parseInt(cedula[2], 10);
    if (tercerDigito >= 6) return false;

    const coeficientes = [2,1,2,1,2,1,2,1,2];
    let suma = 0;

    for (let i = 0; i < coeficientes.length; i++) {
      let valor = parseInt(cedula[i], 10) * coeficientes[i];
      if (valor >= 10) valor -= 9;
      suma += valor;
    }

    const digitoVerificador = parseInt(cedula[9], 10);
    const decenaSuperior = Math.ceil(suma / 10) * 10;
    const resultado = decenaSuperior - suma;

    const digitoCalculado = resultado === 10 ? 0 : resultado;

    return digitoCalculado === digitoVerificador;
  }
}