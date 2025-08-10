import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class FormComponent implements OnInit {
  userForm!: FormGroup;
  submitted = false;
  userData: any;
  usersList: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  // Getter for form controls
  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid) return;

    this.http.post('http://backend:5265/api/users', this.userForm.value)
      .subscribe({
        next: (res) => {
          this.userData = res;
          this.userForm.reset();
          this.submitted = false;
          alert('Form submitted');
        },
        error: (err) => {
        console.error('Error creating user:', err);
        alert(`${err.error?.message || 'error occurred while creating user.'}`);
      }
      });
  }

  // New method to get all users
  getAllUsers(): void {
    this.http.get<any[]>('http://backend:5265/api/users')
      .subscribe({
        next: (res) => {
          this.usersList = res;
        },
        error: (err) => console.error('Error fetching users:', err)
      });
  }
}





