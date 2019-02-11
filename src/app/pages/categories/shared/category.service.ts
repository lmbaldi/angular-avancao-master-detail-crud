import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError} from "rxjs";
import { map, catchError, flatMap} from "rxjs/operators";
import { Category } from './category.model';
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apitPath: string = "api/categories";//referencia ao in_memory-database.ts padrao para requisicao segundo a documentacao do in-memory(api/....)

  constructor( private http: HttpClient) { }

  getAll(): Observable<Category[]>{
    return this.http.get(this.apitPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apitPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  create(category: Category): Observable<Category>{
    return this.http.post(this.apitPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  update(category: Category): Observable<Category>{
    const url = `${this.apitPath}/${category.id}`;
    // return this.http.put("dfjdfhdfkjdfh", category).pipe( //provacando erro para testar
    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(()=> category)
    )
  }

  delete(id: number): Observable<any>{
    const url = `${this.apitPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

//private methods

  private jsonDataToCategory(jsonData: any): Category{
    return jsonData as Category;
  }

  private jsonDataToCategories(jsonData: any[]): Category[]{
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category));
    return categories;
  }

  private handleError(erro: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ", erro);
    return throwError(erro);
  } 



}
