
import { EmployeeIndexComponent } from './employee-index.component';
import { ToastService } from '../../shared/toast.service';
import { EmployeeService } from '../../services/employee.service';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('EmployeeIndexComponent', () => {
  let component: EmployeeIndexComponent;
  let fixture: ComponentFixture<EmployeeIndexComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeIndexComponent],
      providers: [
        { provide: ToastService, useValue: { show: jasmine.createSpy('show') } },
        { provide: EmployeeService, useValue: { getEmployees: () => ({ subscribe: () => {} }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
