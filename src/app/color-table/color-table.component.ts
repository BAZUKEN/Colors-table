import { Component, OnInit } from '@angular/core';
import { Color } from "../shared/color.model";
import { ColorsImportService } from "../shared/color-import.service";
import { Sort } from '@angular/material';

@Component({
  selector: 'app-color-table',
  templateUrl: './color-table.component.html',
  styleUrls: ['./color-table.component.less']
})
export class ColorTableComponent implements OnInit {

  colors: Color[];

  constructor ( private colorsArr: ColorsImportService ) { }

  ngOnInit() {
    this.colorsArr.getColors().subscribe(
      data => this.colors = data["colorsArray"]
    )
  }

  sortColors(sort: Sort) {
    const data = this.colors.slice();
    if (!sort.active || sort.direction === '') {
      this.colors = data;
      return;
    }

    this.colors = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active){
        case 'colorName' : return compare(a.colorName, b.colorName, isAsc);
        case 'hexValue' : return compare(a.hexValue, b.hexValue, isAsc);
        default: return 0;
      }
    })
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

