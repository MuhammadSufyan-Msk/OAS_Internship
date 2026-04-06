import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTable } from './core-table';

describe('CoreTable', () => {
  let component: CoreTable;
  let fixture: ComponentFixture<CoreTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CoreTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
