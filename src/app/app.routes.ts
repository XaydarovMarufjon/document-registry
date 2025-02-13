import { Routes } from '@angular/router';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentFormComponent } from './components/document-form/document-form.component';

export const routes: Routes = [
    { path: '', component: DocumentListComponent }, 
  { path: 'add', component: DocumentFormComponent },  
  { path: 'edit/:id', component: DocumentFormComponent  },
  { path: '**', redirectTo: '' } 
];
