import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetDialogComponent } from './tweet-dialog.component';

describe('TweetDialogComponent', () => {
  let component: TweetDialogComponent;
  let fixture: ComponentFixture<TweetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TweetDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
