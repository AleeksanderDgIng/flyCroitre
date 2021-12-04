import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RutaModelo } from '../modelos/ruta.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) { 
    this.token = this.seguridadService.getToken();
  }

  url = "http://localhost:3000"
  token: string = ''

//metodo que crea un usuario (post)
store(ruta: RutaModelo): Observable<RutaModelo> {
  return this.http.post<RutaModelo>(`${this.url}/rutas`, {
    tiempoEstimado: ruta.tiempoEstimado,
    origen: ruta.origen,
    destino: ruta.destino,

  });
}

//metodo para listar  (get), con permisos authotization token
getAll(): Observable<RutaModelo[]> {
  return this.http.get<RutaModelo[]>(`${this.url}/rutas`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}

//metodo Actualizar (patch) con la url
update(ruta: RutaModelo): Observable<RutaModelo> {
  return this.http.patch<RutaModelo>(`${this.url}/rutas/${ruta.id}`, {
    tiempoEstimado: ruta.tiempoEstimado,
    origen: ruta.origen,
    destino: ruta.destino,
  }, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  });
}

//metodo para Eliminar (delete)
delete(id: string): Observable<RutaModelo[]> {
  return this.http.delete<RutaModelo[]>(`${this.url}/rutas/${id}`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}

//metodo consultar un unico aeropuerto con el id
getWithId(id: string): Observable<RutaModelo> {
  return this.http.get<RutaModelo>(`${this.url}/rutas/${id}`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}

}
