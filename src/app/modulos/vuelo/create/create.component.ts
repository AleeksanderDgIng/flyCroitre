import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { VueloService } from 'src/app/servicios/vuelo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private vueloService: VueloService,
    private router: Router,
    private rutaService: RutaService,

  ) { }

  listadoRutas: RutaModelo[] = []

  fgValidacion = this.fb.group({
    fechaInicio: ['', [Validators.required]],
    horaInicio: ['', [Validators.required]],
    fechaFin: ['', [Validators.required]],
    horaFin: ['', [Validators.required]],
    asientosVendidos: ['', [Validators.required]],
    nombrePiloto: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getAllRutas()
  }

  store(){
    let vuelo = new VueloModelo();
    vuelo.fechaInicio =  new Date(this.fgValidacion.controls["fechaInicio"].value)
    vuelo.horaInicio = this.fgValidacion.controls["horaInicio"].value;
    vuelo.fechaFin =  new Date(this.fgValidacion.controls["fechaFin"].value)
    vuelo.horaFin = this.fgValidacion.controls["horaFin"].value;
    vuelo.asientosVendidos = this.fgValidacion.controls["asientosVendidos"].value;
    vuelo.nombrePiloto = this.fgValidacion.controls["nombrePiloto"].value;
    vuelo.ruta = this.fgValidacion.controls["ruta"].value;

    this.vueloService.store(vuelo).subscribe((data: VueloModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/vuelo/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


  getAllRutas(){
    this.rutaService.getAll().subscribe((data: RutaModelo[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }



}
