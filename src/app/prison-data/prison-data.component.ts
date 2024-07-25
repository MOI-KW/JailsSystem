import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableConstants } from 'src/app/Globals/datatable';


@Component({
  selector: 'app-prison-data',
  templateUrl: './prison-data.component.html',
  styleUrls: ['./prison-data.component.scss'],
})
export class PrisonDataComponent implements OnInit {
  data = [];
  tableData = [];
  filterTableData = [];

  isLoading = false;
  tblHeadArr: any[string] = [
    'CivilId',
    'Name',
    'CaseNumber',
    'Description',
    'Nationality',
    'Cell',
    'View',
  ]; 

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  itemPerPage = DataTableConstants.ItemPerPage;
  pageSize = DataTableConstants.PageSize;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  activeModalRef: any;
  constructor(private router: Router) {
    this.tableData = JSON.parse(
      localStorage.getItem('selectedData')
    )?.tableData;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.filterTableData = this.tableData;
  }

  ngAfterViewInit() {
    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.paginator = this.paginator;
  }
  searchStudent(value: any) {
    debugger;
    const filteredData = this.filterTableData.filter((e) => {
      return e?.RowsJeWork?.CivilId?.toString()
        .toUpperCase()
        .includes(value.target.value.toString().toUpperCase());
    });
    console.log(filteredData);
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
