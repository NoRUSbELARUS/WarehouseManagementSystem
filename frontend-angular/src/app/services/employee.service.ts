import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeDTO } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  createEmployee(dto: EmployeeDTO): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, dto);
  }

  updateEmployee(id: string, dto: EmployeeDTO): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, dto);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}