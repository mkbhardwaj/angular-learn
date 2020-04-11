import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit {
  errorMessage = "";
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe((data: any) => {
      this.errorMessage = data['message'];
    });
  }


}
