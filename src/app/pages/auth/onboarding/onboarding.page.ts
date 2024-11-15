import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage {
  public currentSlide = 0;
  public totalSlides = 3;

  constructor(
    private router: Router
  ) { }

  ionViewDidEnter() {
    setTimeout(() => {
      const swiperEl = document.querySelector('swiper-container') as any;

      if (swiperEl && swiperEl.swiper) {
        swiperEl.swiper.slideTo(0);
        swiperEl.swiper.on('slideChange', () => {
          this.currentSlide = swiperEl.swiper.activeIndex;
          console.log('Aktif slayt:', this.currentSlide);
        });
      } else {
        console.error('Swiper yüklenmedi.');
      }
    }, 100);
  }

  public navigateToSignIn() {
    this.router.navigate(['auth/sign-in'])
  }

  handleNextClick(swiper: any) {
    if (this.currentSlide === this.totalSlides - 1) {
      this.navigateToSignIn();
    } else {
      swiper.swiper.slideNext();
    }
  }
}
