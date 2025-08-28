import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteEtudiant } from './carte-etudiant';

describe('CarteEtudiant', () => {
  let component: CarteEtudiant;
  let fixture: ComponentFixture<CarteEtudiant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteEtudiant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteEtudiant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
