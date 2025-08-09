import { Component, signal } from '@angular/core';
import { FormComponent } from './form/form';
// import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [FormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular');
}
