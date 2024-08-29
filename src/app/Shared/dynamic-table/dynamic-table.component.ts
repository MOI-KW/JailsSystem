import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableConstants } from 'src/app/Globals/datatable';


@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
  data = [];
  tableData = [];
  filterTableData = [];
  @Output() selectedRow = new EventEmitter<any>();
  @Input() individualReq: any[] = [];
  @Input() columns: any[] = [];
  @Input() displayedColumns: any[] = [];
  @Input() getUserName: any = {};
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = false;
  dataSource!: MatTableDataSource<any>;
  itemPerPage = DataTableConstants.ItemPerPage;
  pageSize = DataTableConstants.PageSize;
  pageSizeOptions: number[] = [10, 25, 50];
  selectedPrisoner: any
  activeModalRef: any;

  constructor() { }

  ngOnChanges(simpleChange: SimpleChanges) {
    if (simpleChange['individualReq']) {
      this.dataSource = new MatTableDataSource(this.individualReq);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = 'التالي';
    paginatorIntl.previousPageLabel = 'السابقة';
    paginatorIntl.firstPageLabel = 'الأولى';
    paginatorIntl.lastPageLabel = 'الأخيرة';
    paginatorIntl.itemsPerPageLabel = '';
    paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return "0 (" + length + ")";
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize > length ? (Math.ceil(length / pageSize) - 1) * pageSize : page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return (startIndex + 1) + " - " + endIndex + " (" + length + ") ";
    };


    this.dataSource = new MatTableDataSource(this.individualReq);
    this.dataSource.paginator = this.paginator;
    this.filterTableData = this.individualReq;
    this.dataSource.sort = this.sort;
    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.paginator = this.paginator;
  }


  onView(rowItem: any) {
    this.selectedRow.emit(rowItem);
  }

  search(value: any) {
    const searchTerm = value.target.value.toString().toUpperCase().trim();
    const filteredData = this.filterTableData.filter((item) => {
      // Check if any value in the item matches the search term
      return Object.values(item).some((val) => {
        // Convert the value to string and perform a case-insensitive match
        return val.toString().toUpperCase().includes(searchTerm);
      });
    });
    console.log(filteredData);
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  goBack() {
    // this.router.navigateByUrl('home');
  }
}