import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlumnosEndpoint } from '../endpoints/alumnos.endpoint';
import { Observable } from 'rxjs';
import { Alumnos } from '../../dataservice/alumnos';
import { IAlumnos } from '../interfaces/alumnos.interface';
import { filter, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})



export class Alumnoservice {
  constructor(private http: HttpClient) {
  }



  getAlumnos(): Observable<Array<IAlumnos>> {
    return this.http.get<Array<IAlumnos>>('../../../assets/malumnos.json');

  }

   
  // const post$: Observable<Array<Ipost>> = this.http.get<Array<Ipost>>('/assets/aulas.json');

  // getAlumnos(): Observable<Array<IAlumnos>> {
  //   return this.http.get<Array<IAlumnos>>(AlumnosEndpoint.rest)
  // }

  getAlumno(id: number): Observable<Alumnos> {
    const url = `${AlumnosEndpoint.rest}/${id}/`;
    return this.http.get<Alumnos>(url);
  }


  addAlumno(data: IAlumnos): Observable<IAlumnos> {
    const url = `${AlumnosEndpoint.rest}/`;
    return this.http.post<IAlumnos>(url, data);
  }

  updateAlumno(id: number, data: IAlumnos): Observable<IAlumnos> {
    const url = `${AlumnosEndpoint.rest}/${id}/`;
    return this.http.put<IAlumnos>(url, data);
  }

  deleteAlumno(id: number): Observable<any | null> {
    const url = `${AlumnosEndpoint.rest}/${id}/`;
    return this.http.delete(url);
  }


}
