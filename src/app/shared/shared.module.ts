import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidenavComponent],
  imports: [CommonModule, MaterialModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ]
})
export class SharedModule {}
