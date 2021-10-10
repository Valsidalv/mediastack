import { Component } from '@angular/core';
import { InfoService } from './services/info.service';
import { ApiResponse } from './models/info.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'infoApp';
  curPage: number = 1;
  public infoObject: Observable<ApiResponse>;
  public offset = '0';
  public limit = '100';
  public searchText = '';
  public sort = '';

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    this.infoObject = this.infoService.getInfo(this.offset, this.limit);
  }

  switchCategorie(cat: string) {
    this.infoService.switchCategories(cat);
    this.infoObject = this.infoService.getInfo('0', '100');
  }

  setSort(event: any) {
    this.sort = event.target.value;
    this.sortDisplay(this.sort);
  }

  sortDisplay(sort: string) {
    this.infoService.sortDisplay(sort);
    this.infoObject = this.infoService.getInfo('0', '100');
  }
}
