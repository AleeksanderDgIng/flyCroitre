import { Component, OnInit } from '@angular/core';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(
    private rutaService: RutaService
  ) { }

  listado: RutaModelo[] = [] 

  ngOnInit(): void {
    this.getAll()
  }

  //metodo traer informacion
  getAll(){
    this.rutaService.getAll().subscribe((data: RutaModelo[]) => {
      this.listado = data
      console.log(data)
    })
  }
 
  //metodo eliminar informacion
  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Acpetar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rutaService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }

}
