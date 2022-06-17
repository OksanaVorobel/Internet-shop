import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOrderComponent } from './make-order.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";


describe('MakeOrderComponent', () => {
  let component: MakeOrderComponent;
  let fixture: ComponentFixture<MakeOrderComponent>;
  let httpTestingController: HttpTestingController;
  const formBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [ MakeOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make form', function () {
    const form = formBuilder.group({
      quantity: '',
      city: '',
      address: ''
    });
    component.ngOnInit();
    expect(component.form.getRawValue()).toEqual(form.getRawValue());
  });

  it('should make post request', function () {
    component.submit();
    const req = httpTestingController.expectOne('http://127.0.0.1:5000/products/undefined/order');
    expect(req.request.method).toEqual('POST');
  });

});
