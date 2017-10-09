import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service'

@Component({
  selector: 'app-zero',
  templateUrl: './zero.component.html',
  styleUrls: ['./zero.component.css']
})
export class ZeroComponent implements OnInit {

  constructor(
    public backend: BackendService,
  ) { }

  ngOnInit() {
  }

  createAuthor() {
    alert('create!')
  }

}
