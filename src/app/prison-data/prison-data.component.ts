import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormField } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableConstants } from 'src/app/Globals/datatable';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-prison-data',
  templateUrl: './prison-data.component.html',
  styleUrls: ['./prison-data.component.scss'],
})
export class PrisonDataComponent implements OnInit {
  data = [];
  tableData = [];

  isLoading = false;
  tblHeadArr: any[string] = [
    'CivilId',
    'Name',
    'CaseNumber',
    'Description',
    'Nationality',
    'Cell',
    'View',
  ]; //CreatedDate

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  itemPerPage = DataTableConstants.ItemPerPage;
  pageSize = DataTableConstants.PageSize;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  activeModalRef: any;
  constructor(private router: Router) {
    // console.log(this.dataSource, 'this.dataSource');
    this.tableData = JSON.parse(
      localStorage.getItem('selectedData')
    )?.tableData;
    debugger;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView(event: any) {
    localStorage.setItem(
      'selectedData',
      JSON.stringify({
        selectedPrisonerData: event,
        tableData: this.tableData,
      })
    );
    this.router.navigate(['prisoner-details'], {
      state: {
        data: {
          selectedPrisonerData: event,
          tableData: this.tableData,
        },
      },
    });
  }
  goBack() {
    this.router.navigateByUrl('home');
  }
}
