import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast:any;
declare var require: any;
const ExcelJS = require('exceljs');
var fs = require('file-saver');

@Component({
  selector: 'app-index-productos',
  templateUrl: './index-productos.component.html',
  styleUrls: ['./index-productos.component.css']
})
export class IndexProductosComponent implements OnInit {

  public load_data = true;
  public token;
  public filtro = '';
  public productos : Array<any> = [];
  public arr_productos : Array<any> = [];
  public url;
  public page = 1;
  public pageSize = 20;
  public usuario : any = {};

  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService
  ) { 
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url;
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);
   }

  ngOnInit(): void {

    if(this._adminService.getUser().rol == 'vendedor'){
      this.obtenerProductos('', this.token, this._adminService.getUser()._id);
    }

    if(this._adminService.getUser().rol == 'admin'){
      this.obtenerProductos('', this.token, null);
    }
    
  }

  obtenerProductos(filtro: any, token: any, id: any){
    this._productoService.listar_productos(filtro, token, id).subscribe(
      response => {
        this.productos = response.data;
        this.productos.forEach(element => {
          this.arr_productos.push({
            titulo: element.titulo,
            stock: element.stock,
            precio: element.precio,
            categoria: element.categoria,
            nventas: element.nventas
          });
        });

        console.log(this.arr_productos);
        this.load_data = false;
        // console.log(this.productos);
      },error => {
        console.log(error);
      }
    )
  }

  filtrar(){
    if(this.filtro){
      if(this._adminService.getUser().rol == 'vendedor'){
        this.obtenerProductos(this.filtro, this.token, this._adminService.getUser()._id);
      }
  
      if(this._adminService.getUser().rol == 'admin'){
        this.obtenerProductos(this.filtro, this.token, null);
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Debe ingresar el filtro'
      })
    }
  }

  limpiar(){
    if(this._adminService.getUser().rol == 'vendedor'){
      this.obtenerProductos('', this.token, this._adminService.getUser()._id);
    }

    if(this._adminService.getUser().rol == 'admin'){
      this.obtenerProductos('', this.token, null);
    }
  }

  donwload_excel(){
    const workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.arr_productos){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30},
      { header: 'Stock', key: 'col2', width: 15},
      { header: 'Precio', key: 'col3', width: 15},
      { header: 'Categoria', key: 'col4', width: 25},
      { header: 'N° ventas', key: 'col5', width: 15},
    ]as any;

    workbook.xlsx.writeBuffer().then((data:any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }
}
