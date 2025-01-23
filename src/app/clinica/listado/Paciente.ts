export interface PersonaDTO{
    cedula: string,
    nombre: string,
    apellido: string,
    telefono: string,
    correo: string,
    historialMedico:string
}

export interface Persona{
    pacienteID: number
    nombre: string
    apellido: string
    cedula: string
    telefono: string
    correo: string
    activo: boolean
    historialMedico: string
    signosVitales: any[]
}