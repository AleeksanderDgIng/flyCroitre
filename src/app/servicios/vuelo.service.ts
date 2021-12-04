import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VueloModelo } from '../modelos/vuelo.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class VueloService {

  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) {
    this.token = this.seguridadService.getToken();
  }

  url = "http://localhost:3000"
  token: string = ''

  //metodo que crea un usuario (post)
  store(vuelo: VueloModelo): Observable<VueloModelo> {
    return this.http.post<VueloModelo>(`${this.url}/vuelos`, {
      fechaInicio: vuelo.fechaInicio,
      horaInicio: vuelo.horaInicio,
      fechaFin: vuelo.fechaFin,
      horaFin: vuelo.horaFin,
      asientosVendidos: vuelo.asientosVendidos,
      nombrePiloto: vuelo.nombrePiloto,
      ruta: vuelo.ruta,
    });
  }

  //metodo para listar los usuarios (get), con permisos authotization token
  getAll(): Observable<VueloModelo[]> {
    return this.http.get<VueloModelo[]>(`${this.url}/vuelos`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  //metodo Actualizar el usuario (patch) con la url
  update(vuelo: VueloModelo): Observable<VueloModelo> {
    return this.http.patch<VueloModelo>(`${this.url}/vuelos/${vuelo.id}`, {
      fechaInicio: vuelo.fechaInicio,
      horaInicio: vuelo.horaInicio,
      fechaFin: vuelo.fechaFin,
      horaFin: vuelo.horaFin,
      asientosVendidos: vuelo.asientosVendidos,
      nombrePiloto: vuelo.nombrePiloto,
      ruta: vuelo.ruta,
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  //metodo para Eliminar un usuario (delete)
  delete(id: string): Observable<VueloModelo[]> {
    return this.http.delete<VueloModelo[]>(`${this.url}/vuelos/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  //metodo consultar un unico usuario con el id
  getWithId(id: string): Observable<VueloModelo> {
    return this.http.get<VueloModelo>(`${this.url}/vuelos/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

}
