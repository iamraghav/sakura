import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EductaionComponent } from './eductaion.component';

describe('EductaionComponent', () => {
  let component: EductaionComponent;
  let fixture: ComponentFixture<EductaionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EductaionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EductaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
