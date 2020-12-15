import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-to-modal',
  templateUrl: './text-to-modal.component.html',
  styleUrls: ['./text-to-modal.component.scss']
})
export class TextToModalComponent {
  @Input() title: string;
  @Input() text: string;
}
