import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
// import {SidebarModule} from 'primeng/sidebar';
import{ DashboardComponent} from './dashboard/dashboard.component'
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,LeafletModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,DashboardComponent]
})
export class HomePageModule {}
