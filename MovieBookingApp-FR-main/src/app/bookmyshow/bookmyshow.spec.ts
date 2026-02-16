import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookmyshow } from './bookmyshow';

describe('Bookmyshow', () => {
  let component: Bookmyshow;
  let fixture: ComponentFixture<Bookmyshow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookmyshow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookmyshow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
