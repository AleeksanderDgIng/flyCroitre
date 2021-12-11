import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { VueloService } from 'src/app/servicios/vuelo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private vueloService: VueloService,
    private router: Router,
    private route: ActivatedRoute,
    private rutaService: RutaService,
  ) { }

  listadoRutas: RutaModelo[] = []

  //Creamos las variables de validación y para capturar el id 
  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    fechaInicio: ['', [Validators.required]],
    horaInicio: ['', [Validators.required]],
    fechaFin: ['', [Validators.required]],
    horaFin: ['', [Validators.required]],
    asientosVendidos: ['', [Validators.required]],
    nombrePiloto: ['', [Validators.required]],
    ruta: ['', [Validators.required]],    
  });

  id: string=''

  //agregamos las instrucciones a realizar al cargar el componente
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
    this.getAllRutas()
  }

  //método para traer la informacion del registro
  buscarRegistro(id: string){
    this.vueloService.getWithId(id).subscribe((data: VueloModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["fechaInicio"].setValue(data.fechaInicio)
      this.fgValidacion.controls["horaInicio"].setValue(data.horaInicio)
      this.fgValidacion.controls["fechaFin"].setValue(data.fechaFin)
      this.fgValidacion.controls["horaFin"].setValue(data.horaFin)
      this.fgValidacion.controls["asientosVendidos"].setValue(data.asientosVendidos)
      this.fgValidacion.controls["nombrePiloto"].setValue(data.nombrePiloto)
      this.fgValidacion.controls["ruta"].setValue(data.ruta)
    })
  }

  // metodo para editar la informacion
  edit(){
    let vuelo = new VueloModelo();
    vuelo.id = this.fgValidacion.controls["id"].value;
    vuelo.fechaInicio =  new Date(this.fgValidacion.controls["fechaInicio"].value)
    vuelo.horaInicio = this.fgValidacion.controls["horaInicio"].value;
    vuelo.fechaFin =  new Date(this.fgValidacion.controls["fechaFin"].value)
    vuelo.horaFin = this.fgValidacion.controls["horaFin"].value;
    vuelo.asientosVendidos = this.fgValidacion.controls["asientosVendidos"].value;
    vuelo.nombrePiloto = this.fgValidacion.controls["nombrePiloto"].value;
    vuelo.ruta = this.fgValidacion.controls["ruta"].value;

    this.vueloService.update(vuelo).subscribe((data: VueloModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
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
