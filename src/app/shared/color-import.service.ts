import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ColorItn {
    colorName: string;
    hexValue: string;
}

@Injectable({
  providedIn: 'root'
})

export class ColorsImportService {

  constructor(private httpClient: HttpClient) { }

  getColors() {
    return this.httpClient.get('../../assets/all-colors.json');
  }
}