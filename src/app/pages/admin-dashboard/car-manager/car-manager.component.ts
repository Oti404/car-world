import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService, Car, CarOption } from '../../../services/car.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-car-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './car-manager.component.html',
  styleUrl: './car-manager.component.css'
})
export class CarManagerComponent {
  private fb = inject(FormBuilder);
  private carService = inject(CarService);
  private storageService = inject(StorageService);

  carForm!: FormGroup;
  selectedFile: File | null = null;
  isUploading = false;

  constructor() {
    this.initForm();
  }

  initForm() {
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      basePrice: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      engineSpecs: ['', Validators.required],
      options: this.fb.group({
        colors: this.fb.array([]),
        wheels: this.fb.array([]),
        interior: this.fb.array([]),
        extras: this.fb.array([])
      })
    });
  }

  // Helper getters for FormArrays
  get colors() { return this.carForm.get('options.colors') as FormArray; }
  get wheels() { return this.carForm.get('options.wheels') as FormArray; }
  get interior() { return this.carForm.get('options.interior') as FormArray; }
  get extras() { return this.carForm.get('options.extras') as FormArray; }

  // Add an option to a specific category
  addOption(category: 'colors' | 'wheels' | 'interior' | 'extras') {
    const optionGroup = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
    this[category].push(optionGroup);
  }

  // Remove an option from a specific category
  removeOption(category: 'colors' | 'wheels' | 'interior' | 'extras', index: number) {
    this[category].removeAt(index);
  }

  // Handle file selection
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  // Submit the form
  async onSubmit() {
    if (this.carForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    if (!this.selectedFile) {
      alert('Please select an image for the car.');
      return;
    }

    this.isUploading = true;
    try {
      const formValue = this.carForm.value;
      
      // 1. Upload the image to Firebase Storage
      const imageUrl = await this.storageService.uploadCarImage(this.selectedFile, formValue.name);

      // 2. Prepare the car object
      const newCar: Car = {
        name: formValue.name,
        basePrice: formValue.basePrice,
        stock: formValue.stock,
        description: formValue.description,
        engineSpecs: formValue.engineSpecs,
        images: [imageUrl], // Save the URL we just got mapping the physical image to the DB
        options: {
          colors: formValue.options.colors,
          wheels: formValue.options.wheels,
          interior: formValue.options.interior,
          extras: formValue.options.extras
        }
      };

      // 3. Save to Firestore
      await this.carService.addCar(newCar);
      
      alert('Car added successfully!');
      this.initForm(); // Reset form
      this.selectedFile = null;
      
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to add car. See console for details.');
    } finally {
      this.isUploading = false;
    }
  }
}
