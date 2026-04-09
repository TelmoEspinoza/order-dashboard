import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomComponents } from './custom-components';

describe('CustomComponents', () => {
  let component: CustomComponents;
  let fixture: ComponentFixture<CustomComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
