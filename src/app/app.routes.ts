import { Routes } from '@angular/router';
import { ListadoPacienteComponent } from './clinica/listado/listado-paciente/listado-paciente.component';
import { EditarPacienteComponent } from './clinica/listado/editar-paciente/editar-paciente.component';
import { CrearPacienteComponent } from './clinica/listado/crear-paciente/crear-paciente.component';
import { ListadoAtencionComponent } from './clinica/atencion/listado-atencion/listado-atencion.component';
import { DoctoresPageComponent } from './doctores/doctores-page/doctores-page.component';
import { RecetaComponent } from './clinica/atencion/receta/receta.component';
import { ListadoFormularioComponent } from './clinica/atencion/listado-formulario/listado-formulario.component';
import { LoginComponent } from './login/login/login.component';
import { esAdminGuard } from './shared/guards/es-admin.guard';

export const routes: Routes = [
    {path: '',component: ListadoPacienteComponent, canActivate: [esAdminGuard]},
    {path: 'editar-paciente', component: EditarPacienteComponent, canActivate: [esAdminGuard]},
    {path: 'crear-paciente',component: CrearPacienteComponent, canActivate: [esAdminGuard]},
    {path: 'atencion', component: ListadoAtencionComponent, canActivate: [esAdminGuard]},
    {path: 'doctor', component: DoctoresPageComponent, canActivate: [esAdminGuard]},
    {path: 'receta', component: RecetaComponent, canActivate: [esAdminGuard]},
    {path: 'listado-receta', component: ListadoFormularioComponent, canActivate: [esAdminGuard]},
    {path: 'login', component:LoginComponent},

    {path: '**', redirectTo: ''}
];
