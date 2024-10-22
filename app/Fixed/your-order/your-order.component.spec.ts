import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourOrderComponent } from './your-order.component';

describe('YourOrderComponent', () => {
  let component: YourOrderComponent;
  let fixture: ComponentFixture<YourOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
