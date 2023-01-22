import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-edit-numeric',
    templateUrl: './edit-numeric.component.html',
    styleUrls: ['./edit-numeric.component.css']
})
export class EditNumericComponent {
    @Input() value: number
    @Output() outValue = new EventEmitter<number>();

    saveNumData(value: string) {
        let number = Number(value);
        if (isNaN(number)) {
            number = 0.0
        }
        this.outValue.emit(number);
    }
}
