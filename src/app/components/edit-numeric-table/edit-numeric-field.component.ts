import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'vlt-edit-numeric-field',
    templateUrl: './edit-numeric-field.component.html',
    styleUrls: ['./edit-numeric-field.component.css']
})
export class EditNumericFieldComponent implements OnInit {

    @Input() value: number
    @Output() outValue = new EventEmitter<number>();

    saveNumData(value: string) {
        let number = Number(value);
        if (isNaN(number)) {
            number = 0.0
        }
        this.outValue.emit(number);
    }

    ngOnInit(): void {
    }

}
