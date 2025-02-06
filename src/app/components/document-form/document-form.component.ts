import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule
],
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit {
  documentForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private documentService : DocumentService,
    public dialogRef: MatDialogRef<DocumentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
  }

  ngOnInit(): void {
    this.documentForm = this.fb.group({
      regNumber: [this.data?.regNumber ||'', [Validators.required]],
      regDate: [this.data?.regDate || new Date(), [Validators.required, this.dateValidator]],
      outgoingNumber: [this.data?.outgoingNumber ||''],
      outgoingDate: [this.data?.outgoingDate || '', this.dateValidator],
      deliveryMethod: [this.data?.deliveryMethod ||''],
      correspondent: [ this.data?.correspondent || '', [Validators.required]],
      subject: [ this.data?.subject ||'', [Validators.required, Validators.maxLength(100)]],
      description: [this.data?.description ||'', [Validators.maxLength(1000)]],
      dueDate: [this.data?.dueDate || '', this.dateValidator],
      access: [this.data?.access || false],
      control: [this.data?.control|| false],
      file: [this.data?.file || '']
    });
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return isNaN(Date.parse(value)) ? { invalidDate: true } : null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const allowedFormats = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (file.size > 1048576) {
        alert('Размер файла превышает 1Мб.');
        return;
      }
      if (!allowedFormats.includes(file.type)) {
        alert('Недопустимый формат файла.');
        return;
      }
      this.selectedFile = file;
      this.documentForm.patchValue({ file: file });
    }
  }
  
  onSubmit(): void {
    if (this.documentForm.valid) {
      const formData = new FormData();
      Object.keys(this.documentForm.value).forEach(key => {
        formData.append(key, this.documentForm.value[key]);
      });
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      this.documentService.createDocument(formData).subscribe(response => {
        console.log('Документ сохранен:', response);
        this.dialogRef.close(response);
      });
    } else {
      alert('Заполните выделенные поля!');
    }
  }
  
  onClose(): void {
    this.dialogRef.close();
  }
}
