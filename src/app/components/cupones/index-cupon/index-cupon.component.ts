import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public page = 1;
  public pageSize = 20;
  public token : any;

  public load_data = true;
  // public load_btn = false;
  public cupones : Array<any> = [];
  public filtro : any = '';

  constructor(
    private _cuponService: CuponService
  ) { 
    this.token = localStorage.getItem('token');
   }

  obtenerCupones(filtro: any){
    this._cuponService.listar_cupones_admin(filtro, this.token).subscribe(
      response => {
        this.load_data = false;
        this.cupones = response.data;
        console.log(this.cupones);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerCupones('');
  }

  filtrar(){
    this.obtenerCupones(this.filtro);
  }

  limpiar(){
    this.obtenerCupones('');
  }
}
