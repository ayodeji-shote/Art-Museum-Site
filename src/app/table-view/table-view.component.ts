import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Artwork, ArtworkList } from 'src/shared/artworkList.model';
import { ArtworksService } from 'src/shared/artworks.service';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
})
export class TableViewComponent {
  displayedColumns: string[] = ['image_id','title','artist_title', 'place_of_origin', 'date_display'];
  dataSource = new MatTableDataSource<Artwork>([]);
  pageTotal = 0;
  pageIndex = 0;
  constructor(private artworksService: ArtworksService, private router: Router) {}
  public artworksLoaded = false;
  ngOnInit() {
    this.getArtworks(this.pageIndex,20);
  }
  getArtworks(index: number,size :number ){
    this.artworksService.getArtworksPage(index+1,size).subscribe(
      //  The openapi endpoint reports false model as a response in their schema. Hence mapping to any.
      (response: ArtworkList) => {
        if (response.data.length) {
          this.dataSource = new MatTableDataSource<Artwork>(response.data);
          this.artworksLoaded = true;
          this.pageTotal = response.pagination.total;
          this.pageIndex = response.pagination.current_page;
          console.log(this.pageIndex);
        }
        else
        {
          this.artworksLoaded = false;
        }
      },
    );
  }
  PageAmount(size :PageEvent)
  {
    console.log(size);
    this.getArtworks(size.pageIndex,size.pageSize);
  }
  todetailview (id: string)
  {
    console.log(id);
    this.router.navigate(['/detail-view', id]);
    

  }
 
}
