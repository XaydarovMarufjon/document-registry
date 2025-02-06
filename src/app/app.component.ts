import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocumentListComponent } from "./components/document-list/document-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'document-registry';
}
