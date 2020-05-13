import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from 'src/material.module';
import { RouterModule } from '@angular/router';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidenavComponent],
  imports: [CommonModule, MaterialModule, RouterModule,NgMaterialMultilevelMenuModule, MatDialogModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ]
})
export class SharedModule {}
