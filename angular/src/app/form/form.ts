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

  editMode = false;      
  editUserId: number | null = null; 

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

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid) return;

    if (this.editMode && this.editUserId !== null) {
      this.http.put(`http://localhost:5265/api/users/${this.editUserId}`, this.userForm.value)
        .subscribe({
          next: (res) => {
            alert('User updated successfully');
            this.userForm.reset();
            this.submitted = false;
            this.editMode = false;
            this.editUserId = null;
            this.getAllUsers();
          },
          error: (err) => {
            console.error('Error updating user:', err);
            alert(`${err.error?.message || 'Error occurred while updating user.'}`);
          }
        });
    } else {
      this.http.post('http://localhost:5265/api/users', this.userForm.value)
        .subscribe({
          next: (res) => {
            this.userData = res;
            this.userForm.reset();
            this.submitted = false;
            alert('User created successfully');
            this.getAllUsers();
          },
          error: (err) => {
            console.error('Error creating user:', err);
            alert(`${err.error?.message || 'Error occurred while creating user.'}`);
          }
        });
    }
  }

  getAllUsers(): void {
    this.http.get<any[]>('http://localhost:5265/api/users')
      .subscribe({
        next: (res) => {
          this.usersList = res;
        },
        error: (err) => console.error('Error fetching users:', err)
      });
  }

  editUser(user: any): void {
    this.editMode = true;
    this.editUserId = user.id;
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city
    });
  }
}






