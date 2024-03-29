import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  //Creamos las variables de validación para capturar el id 
  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
  });

  id: string=''

  //agregamos las instrucciones a realizar al cargar el componente
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  //método para traer la informacion del registro
  buscarRegistro(id: string){
    this.usuarioService.getWithId(id).subscribe((data: UsuarioModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombre"].setValue(data.nombre)
      this.fgValidacion.controls["apellido"].setValue(data.apellido)
      this.fgValidacion.controls["correo"].setValue(data.correo)
      this.fgValidacion.controls["telefono"].setValue(data.telefono)
    })
  }

  // metodo para editar la informacion
  edit(){
    let usuario = new UsuarioModelo();
    usuario.id = this.fgValidacion.controls["id"].value;
    usuario.nombre = this.fgValidacion.controls["nombre"].value;
    usuario.apellido = this.fgValidacion.controls["apellido"].value;
    usuario.correo = this.fgValidacion.controls["correo"].value;
    usuario.telefono = this.fgValidacion.controls["telefono"].value;

    this.usuarioService.update(usuario).subscribe((data: UsuarioModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
