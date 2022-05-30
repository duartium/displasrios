import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  frmUser: FormGroup;

  constructor(private fb: FormBuilder) { 
      this.frmUser = this.fb.group({
        
      });
  }

  ngOnInit(): void {
  }

}
