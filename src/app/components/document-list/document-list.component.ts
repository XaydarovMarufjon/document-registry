import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DocumentService } from '../../services/document.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DocumentFormComponent } from '../document-form/document-form.component';

@Component({
  selector: 'app-document-list',
  standalone: true,
  templateUrl: './document-list.component.html',
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  displayedColumns: string[] = ['file', 'regNumber', 'regDate', 'outNumber', 'outDate', 'correspondent', 'subject', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private documentService: DocumentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadDocuments();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  loadDocuments(): void {
    this.documentService.getDocuments().subscribe(documents => {
      this.dataSource = new MatTableDataSource(documents);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewFile(fileUrl: string) {
    if (fileUrl) {
      window.open(fileUrl, '_blank'); 
    } else {
      alert('❌ Нет файла!');
    }
  }
  
  openDocumentForm(document?: any): void {
    const dialogRef = this.dialog.open(DocumentFormComponent, {
      width: "700px",
      data:   document 
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDocuments(); 
      }
    });
  }

  deleteDocument(documentId: string): void {
    if (!documentId) return; 
    if (confirm('Вы уверены, что хотите удалить этот документ?')) {
      this.documentService.deleteDocument(documentId).subscribe(() => {
        this.loadDocuments(); 
      });
    }
  }
  
}
