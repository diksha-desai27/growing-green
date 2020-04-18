import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactwebglComponent } from './impactwebgl.component';

describe('ImpactComponent', () => {
  let component: ImpactwebglComponent;
  let fixture: ComponentFixture<ImpactwebglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactwebglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactwebglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
