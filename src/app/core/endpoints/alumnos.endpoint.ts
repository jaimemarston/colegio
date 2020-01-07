import { BASEURL } from '../../../environments/environment';

export class AlumnosEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}malumnos`;
}

export class AlumnodetalleEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}plmovpersonal`;
}


export class EmpctactedetalleEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}plctacte`;
}

export class Alumnodetalle2Endpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}alumnorem`;
}

