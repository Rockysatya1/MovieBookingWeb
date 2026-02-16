import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Home } from './home/home';
import { CommonModule } from '@angular/common';
import { LayoutService } from './core/services/layout.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private layoutService = inject(LayoutService);
  
  isLayoutVisible = this.layoutService.isLayoutVisible;
  
  protected readonly title = signal('movie-booking-fr');
}
