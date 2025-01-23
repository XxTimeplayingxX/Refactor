import { Component, inject, OnInit } from '@angular/core';
import { CompartirDatosService } from '../../../services/compartir-datos.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-listado-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './listado-formulario.component.html',
  styleUrl: './listado-formulario.component.css',
})
export class ListadoFormularioComponent implements OnInit {
  ngOnInit(): void {
    // this.dataService.data$.subscribe((datos) => {
    //   this.listDetalleReceta = datos;
    //   console.log('Estamos en el listado formulario ',this.listDetalleReceta)
    // });
    this.ColocarDatos()
  }
  dataService = inject(CompartirDatosService);
  private formBuilder = inject(FormBuilder);
  habilitado = false;

  listDetalleReceta: any[] = [
    {
      medicamento: 'Umbral',
      dosis: '10 mg',
      frecuencia: 1,
      horaElegida:'08:30',
      fechaInicio: '2024-12-05',
      duracion: 2,
      instrucciones: 'Tomar medicamentos',
    },
    {
      medicamento: 'Paracetamol',
      dosis: '100 mg',
      frecuencia: 1,
      horaElegida: '08:30',
      fechaInicio: '2025-12-05',
      duracion: 2,
      instrucciones: 'Tomar medicamentos',
    },
  ];

  form = this.formBuilder.group({
    medicamento: ['', Validators.required],
    dosis: ['', Validators.required],
    frecuencia: ['', Validators.required],
    horaElegida: [''],
    fechaInicio: ['', Validators.required],
    duracion: ['', Validators.required],
    instrucciones: ['', Validators.required],
  });

  ColocarDatos(){
    for(let i =0; i<this.listDetalleReceta.length; i++){
      this.form.patchValue(
        {
          medicamento: this.listDetalleReceta[i].medicamento,
        dosis: this.listDetalleReceta[i].dosis,
        frecuencia: this.listDetalleReceta[i].frecuencia,
        horaElegida: this.listDetalleReceta[i].horaElegida,
        fechaInicio: this.listDetalleReceta[i].fechaInicio,
        duracion: this.listDetalleReceta[i].duracion,
        instrucciones: this.listDetalleReceta[i].instrucciones
        }
      )
    }

    console.log(this.listDetalleReceta);
    
  }

  GuardarCambios(){
    console.log(this.form.value)
  }

  
}
