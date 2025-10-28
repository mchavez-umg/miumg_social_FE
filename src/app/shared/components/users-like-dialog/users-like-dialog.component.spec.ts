import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLikeDialogComponent } from './users-like-dialog.component';

describe('UsersLikeDialogComponent', () => {
  let component: UsersLikeDialogComponent;
  let fixture: ComponentFixture<UsersLikeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersLikeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersLikeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
