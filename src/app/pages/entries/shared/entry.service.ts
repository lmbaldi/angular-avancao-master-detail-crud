import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError} from "rxjs";
import { map, catchError, flatMap} from "rxjs/operators";
import { Entry } from './entry.model';
import { element } from '@angular/core/src/render3';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apitPath: string = "api/entries";//referencia ao in_memory-database.ts padrao para requisicao segundo a documentacao do in-memory(api/....)

  constructor( private http: HttpClient, private categoryService: CategoryService) { }

  getAll(): Observable<Entry[]>{
    return this.http.get(this.apitPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apitPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  create(entry: Entry): Observable<Entry>{

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category =>{
        entry.category = category;

        return this.http.post(this.apitPath, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)
        )
      })
    )
  }

  update(entry: Entry): Observable<Entry>{
    const url = `${this.apitPath}/${entry.id}`;

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return this.http.put(url, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)
        )

      })
    )
  }
  /*
  create(entry: Entry): Observable<Entry>{
    return this.http.post(this.apitPath, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  update(entry: Entry): Observable<Entry>{
    const url = `${this.apitPath}/${entry.id}`;
    // return this.http.put("dfjdfhdfkjdfh", entry).pipe( //provacando erro para testar
    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(()=> entry)
    )
  }
  */

  delete(id: number): Observable<any>{
    const url = `${this.apitPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

//private methods

  // private jsonDataToEntries(jsonData: any[]): Entry[]{
  //   // console.log(jsonData[0] as Entry);
  //   console.log(Object.assign(new Entry(),jsonData[0]));//assinando um object assign
  //   const entries: Entry[] = [];
  //   jsonData.forEach(element => entries.push(element as Entry));
  //   return entries;
  // }

  private jsonDataToEntries(jsonData: any[]): Entry[]{
    const entries: Entry[] = [];

    jsonData.forEach(element =>{ 
      const entry = Object.assign(new Entry(), element);// para acesar todos os elementos do objeto
      entries.push(entry);
    });

    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry{
    return Object.assign(new Entry(), jsonData);
    // return jsonData as Entry;
  }


  private handleError(erro: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ", erro);
    return throwError(erro);
  } 



}
/*
apis ruby on rails
class Entry
belongs_to: Category

category_id

class Category
has_many: entries

entry.getById(2)
{
id:2,
name: "11/08/12",
paid: false,
}

categoryId; 1=> Moradia,
category:{

}
*/