import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  // variable donde se definen los requerimientos para la validación reactiva
  fgValidacion = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(6)]],
    correo: ['', [Validators.required, Validators.email]],
  });


  ngOnInit(): void {
  }

  // metodo para almacenar la información en la base de datos por medio del API
  store(){
    let usuario = new UsuarioModelo();
    usuario.nombre = this.fgValidacion.controls["nombre"].value;
    usuario.apellido = this.fgValidacion.controls["apellido"].value;
    usuario.correo = this.fgValidacion.controls["correo"].value;
    usuario.telefono = this.fgValidacion.controls["telefono"].value;

    this.usuarioService.store(usuario).subscribe((data: UsuarioModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


}
