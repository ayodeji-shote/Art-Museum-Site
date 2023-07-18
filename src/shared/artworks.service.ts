import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtworkList } from './artworkList.model';
import { Artwork } from './art.model';

@Injectable({
  providedIn: 'root'
})
// this service is used to get the artworks from the API 

export class ArtworksService {

  constructor(private httpClient: HttpClient) { }
  // Get generic artworks from the API
  public getArtworks() {
    return this.httpClient.get('https://api.artic.edu/api/v1/artworks');
  }
  // Get generic artworks from the API with the specific id
  // used the get response of the http client to map the json to the models.
  public getArtworksId(id: string): Observable<Artwork> {
    return this.httpClient.get <Artwork>('https://api.artic.edu/api/v1/artworks/' + id);
  }
  // method to support pagination of artworks
  public getArtworksPage(page: number, limit: number): Observable<ArtworkList> {
    return this.httpClient.get <ArtworkList>('https://api.artic.edu/api/v1/artworks?page=' + page + '&limit=' + limit);
  }
  // method to get the fullimage of the artwork 
  

}
