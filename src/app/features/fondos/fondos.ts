import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fondos',
  standalone: true,
  templateUrl: './fondos.html',
  styleUrl: './fondos.scss',
  imports: [RouterModule,CommonModule],
})
export class FondosComponent {

}
