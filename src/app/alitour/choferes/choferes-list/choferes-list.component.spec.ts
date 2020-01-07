import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferesListComponent } from './choferes-list.component';

describe('ChoferesListComponent', () => {
  let component: ChoferesListComponent;
  let fixture: ComponentFixture<ChoferesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoferesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoferesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
