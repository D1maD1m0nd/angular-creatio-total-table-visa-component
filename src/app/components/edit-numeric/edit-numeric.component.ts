import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-numeric',
  templateUrl: './edit-numeric.component.html',
  styleUrls: ['./edit-numeric.component.css']
})
export class EditNumericComponent {
  @Input()  value : number
  @Output() outValue = new EventEmitter<number>();
}
