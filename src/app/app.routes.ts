import { Routes } from '@angular/router';
import { ListadoPacienteComponent } from './clinica/listado/listado-paciente/listado-paciente.component';
import { EditarPacienteComponent } from './clinica/listado/editar-paciente/editar-paciente.component';
import { CrearPacienteComponent } from './clinica/listado/crear-paciente/crear-paciente.component';
import { ListadoAtencionComponent } from './clinica/atencion/listado-atencion/listado-atencion.component';
import { DoctoresPageComponent } from './doctores/doctores-page/doctores-page.component';
import { RecetaComponent } from './clinica/atencion/receta/receta.component';
import { ListadoFormularioComponent } from './clinica/atencion/listado-formulario/listado-formulario.component';
import {unsavedChangesGuard} from './../app/guards/unsaved-changes.guard'
import { LoginComponent } from './login/login/login.component';

export const routes: Routes = [
    {path: '',component: ListadoPacienteComponent},
    {path: 'login', component:LoginComponent},
    {path: 'editar-paciente', component: EditarPacienteComponent},
    {path: 'crear-paciente', canDeactivate:[unsavedChangesGuard],component: CrearPacienteComponent},
    {path: 'atencion', component: ListadoAtencionComponent},
    {path: 'doctor', component: DoctoresPageComponent},
    {path: 'receta',canDeactivate:[unsavedChangesGuard], component: RecetaComponent},
    {path: 'listado-receta', component: ListadoFormularioComponent},





    {path: '**', redirectTo: ''}
];
