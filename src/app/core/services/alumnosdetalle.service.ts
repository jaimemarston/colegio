import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlumnodetalleEndpoint } from '../endpoints/alumnos.endpoint';
import { Observable } from 'rxjs';
import { Alumnosdetalle } from '../../dataservice/alumnos';
import { IAlumnosdetalle } from '../interfaces/alumnos.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlumnosdetalleService {
  constructor(private http: HttpClient) {
  }

  getAlumnos(): Observable<Array<IAlumnosdetalle>> {
    return this.http.get<Array<IAlumnosdetalle>>(AlumnodetalleEndpoint.rest);
  }


  getAlumno(id: number): Observable<IAlumnosdetalle> {
    const url = `${AlumnodetalleEndpoint.rest}/${id}`;
    return this.http.get<IAlumnosdetalle>(url);
  }

  addAlumnos(data: IAlumnosdetalle): Observable<IAlumnosdetalle> {
    return this.http.post<IAlumnosdetalle>(AlumnodetalleEndpoint.rest, data);
  }

  updateAlumnos(id: number, data: IAlumnosdetalle): Observable<IAlumnosdetalle> {
    const url = `${AlumnodetalleEndpoint.rest}/${id}`;
    return this.http.put<IAlumnosdetalle>(url, data);
  }

  deleteAlumnos(id: number): Observable<any | null> {
    const url = `${AlumnodetalleEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }
}
