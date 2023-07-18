import { Component, Input, OnInit } from '@angular/core';
import { ArtworksService } from 'src/shared/artworks.service';
import { ActivatedRoute } from '@angular/router';
import { Art, Artwork } from 'src/shared/art.model';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css'],

})
export class DetailViewComponent {
  @Input() id: string = '';

  public artwork?: Art;
  public artworkLoaded = false;

  constructor(private artworksService: ArtworksService,private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
    {
    this.id = id;
    }
    else
    return;
    this.artworksService.getArtworksId(this.id).subscribe(
      //  The openapi endpoint reports false model as a response in their schema. Hence mapping to any.
      (response: Artwork) => {
        const artworks = response.data;
        
        if (response.data) {
          this.artwork = response.data;
          console.log(this.artwork?.image_id);
          this.artworkLoaded = true;
        }
        else
        {
          this.artworkLoaded = false;
        }
      },
    );
  }
}
