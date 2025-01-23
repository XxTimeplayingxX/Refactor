export interface NotificacionesDTO{
    detalleRecetaID: number, 
    fechaDosis: string,
    enviado: boolean,
    fechaEnviado: Date | null,
    telefono: string,
    mensaje: string
}