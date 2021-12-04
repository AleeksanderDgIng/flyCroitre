import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private rutaService: RutaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

//Creamos las variables de validación y para capturar el id 
fgValidacion = this.fb.group({
  id: ['', [Validators.required]],
  tiempoEstimado: ['', [Validators.required]],
  origen: ['', [Validators.required]],
  destino: ['', [Validators.required]],
});

id: string=''

//agregamos las instrucciones a realizar al cargar el componente
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  //método para traer la informacion del registro
  buscarRegistro(id: string){
    this.rutaService.getWithId(id).subscribe((data: RutaModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["tiempoEstimado"].setValue(data.tiempoEstimado)
      this.fgValidacion.controls["origen"].setValue(data.origen)
      this.fgValidacion.controls["destino"].setValue(data.destino)
    })
  }

  // metodo para editar la informacion
  edit(){
    let ruta = new RutaModelo();
    ruta.id = this.fgValidacion.controls["id"].value;
    ruta.tiempoEstimado = this.fgValidacion.controls["tiempoEstimado"].value;
    ruta.origen = this.fgValidacion.controls["origen"].value;
    ruta.destino = this.fgValidacion.controls["destino"].value;

    this.rutaService.update(ruta).subscribe((data: RutaModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/ruta/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
