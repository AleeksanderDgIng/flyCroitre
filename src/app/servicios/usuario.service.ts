import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/usuario.model';
import { SeguridadService } from './seguridad.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) {
    this.token = this.seguridadService.getToken();
  }

  url = "http://localhost:3000"
  token: string = ''

  //metodo que crea un usuario (post)
  store(usuario: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.post<UsuarioModelo>(`${this.url}/usuarios`, {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono,
      correo: usuario.correo
    });
  }

  //metodo para listar los usuarios (get), con permisos authotization token
  getAll(): Observable<UsuarioModelo[]> {
    return this.http.get<UsuarioModelo[]>(`${this.url}/usuarios`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  //metodo Actualizar el usuario (patch) con la url
  update(usuario: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.patch<UsuarioModelo>(`${this.url}/usuarios/${usuario.id}`, {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono,
      correo: usuario.correo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  //metodo para Eliminar un usuario (delete)
  delete(id: string): Observable<UsuarioModelo[]> {
    return this.http.delete<UsuarioModelo[]>(`${this.url}/usuarios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  //metodo consultar un unico usuario con el id
  getWithId(id: string): Observable<UsuarioModelo> {
    return this.http.get<UsuarioModelo>(`${this.url}/usuarios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }




}
