import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LiquidaciondetalleEndpoint } from '../endpoints/liquidacion.endpoint';
import { Observable } from 'rxjs';
import { Cotizaciondetalle } from '../../dataservice/cotizacion';
import { ILiquidaciondetalle } from '../interfaces/liquidacion.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiquidaciondetalleService {
  constructor(private http: HttpClient) {
  }

  getLiquidaciones(): Observable<Array<ILiquidaciondetalle>> {
    return this.http.get<Array<ILiquidaciondetalle>>(LiquidaciondetalleEndpoint.rest)
  }


  getLiquidacion(id: number): Observable<ILiquidaciondetalle> {
    const url = `${LiquidaciondetalleEndpoint.rest}/${id}`;
    return this.http.get<ILiquidaciondetalle>(url);
  }

  addLiquidacion(data: ILiquidaciondetalle): Observable<ILiquidaciondetalle> {
    return this.http.post<ILiquidaciondetalle>(LiquidaciondetalleEndpoint.rest, data);
  }

  updateLiquidacion(id: number, data: ILiquidaciondetalle): Observable<ILiquidaciondetalle> {
    const url = `${LiquidaciondetalleEndpoint.rest}/${id}`;
    return this.http.put<ILiquidaciondetalle>(url, data);
  }

  deleteLiquidacion(id: number): Observable<any | null> {
    const url = `${LiquidaciondetalleEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }
}
