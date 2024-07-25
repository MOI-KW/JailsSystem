import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderComponent } from './header/header.component';
import { TitleComponent } from './title/title.component';
import { AlertComponent } from './alert/alert.component';
import { ArTransPipe } from '../Pipes/arTrans.pipe';
import { ArResultPipe } from '../Pipes/arResult.pipe';
import { ExecStatusPipe } from '../Pipes/execStatus.pipe';
import { LoaderComponent } from './loader/loader.component';
import { AmtPipe } from '../Pipes/amt.pipe';
import { PercPipe } from '../Pipes/perc.pipe';
import { DatetimeFormatPipe } from '../Pipes/datetime-format.pipe';
import { RasedDatePipe } from '../Pipes/rased-date.pipe';
import { GetAgePipe } from '../Pipes/get-age.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    HeaderComponent,
    TitleComponent,
    AlertComponent,
    LoaderComponent,
    SidemenuComponent,
    ArTransPipe,
    ArResultPipe,
    ExecStatusPipe,
    AmtPipe,
    PercPipe,
    DatetimeFormatPipe,
    RasedDatePipe,
    GetAgePipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgSelectModule,
    MatFormFieldModule,
    MatInputModule
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ReactiveFormsModule,
    NgSelectModule,
    HeaderComponent,
    TitleComponent,
    AlertComponent,
    LoaderComponent,
    SidemenuComponent,
    CommonModule,
    FormsModule,
    ArTransPipe,
    ArResultPipe,
    ExecStatusPipe,
    MatTableModule,
    AmtPipe,
    PercPipe,
    DatetimeFormatPipe,
    RasedDatePipe,
    GetAgePipe,
    MatPaginator,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
    

  ],
})
export class SharedModule { }
