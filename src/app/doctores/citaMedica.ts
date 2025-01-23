import { Persona } from "../clinica/listado/Paciente"
import { Doctor } from "./doctor"

export interface CitaMedica{
    citaMedicaID: number,
    doctorID: number,
    fecha: string,
    doctor: Doctor,
    pacienteID: number,
    paciente: Persona,
    estado: string,
    recetaID: number,
    receta: any
}

export interface CitaMedicaDTO{
    citaMedicaID: number,
      doctorID: number,
      pacienteID: number,
      estado: string,
      recetaID: number | null,
      fecha: Date | string
}