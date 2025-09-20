import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-search-basic',
  templateUrl: './search-basic.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatIconButton,
    MatInput,
    NgIf,
  ],
  styleUrls: ['./search-basic.component.scss']
})
export class SearchBasicComponent {

    @Input() formGroup: FormGroup;
    @Input() titleSearch = 'Buscar';
    @Output() submitSearch = new EventEmitter();
    @Output() clearSearch = new EventEmitter();

    onSubmitSearch() {
        this.submitSearch.emit();
    }

    onClearSearch() {
        this.clearSearch.emit();
    }

}
