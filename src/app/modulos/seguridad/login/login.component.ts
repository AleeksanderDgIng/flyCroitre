import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as cryptoJS from 'crypto-js';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // creación de la variable para hacer la validación
  constructor(
    private fb: FormBuilder, 
    private seguridadService: SeguridadService,
    private router: Router,
   
  ) { }

  // valida los campos que le correspondan
  fgValidacion = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required]]
  });

  ngOnInit(): void {
    
  }

  //función para identificar al usuario
  identificarUsuario() {
    let usuario = this.fgValidacion.controls["correo"].value;
    let clave = this.fgValidacion.controls["clave"].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();
 
    this.seguridadService.login(usuario, claveCifrada).subscribe(
      (data: any) => {
        this.seguridadService.almacenarSesion(data)
        this.router.navigate(['/index']);
      },
      (error: any) => {
        console.log(error)
        //alert("Datos inválidos"); 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Datos inválidos!',
        })    
      }
      
      );
    }


}
