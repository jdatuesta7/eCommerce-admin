import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { AdminGuard } from "./guard/admin.guard";
import { IndexClientesComponent } from "./components/clientes/index-clientes/index-clientes.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { IndexVendedoresComponent } from "./components/vendedores/index-vendedores/index-vendedores.component";
import { CreateVendedorComponent } from "./components/vendedores/create-vendedor/create-vendedor.component";

const appRoute: Routes = [
    {path: '', component: LoginComponent},

    {path: 'inicio', component: InicioComponent},

    {path: 'panel', children: [
        {path: 'clientes', component: IndexClientesComponent, canActivate: [AdminGuard]},
        {path: 'clientes/registro', component: CreateClienteComponent, canActivate: [AdminGuard]},

        {path: 'vendedores', component: IndexVendedoresComponent, canActivate: [AdminGuard]},
        {path: 'vendedores/registro', component: CreateVendedorComponent, canActivate: [AdminGuard]}

    ]}
];

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
