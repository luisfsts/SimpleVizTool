import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-processmodel',
  templateUrl: './processmodel.component.html',
  styleUrls: ['./processmodel.component.css']
})
export class ProcessmodelComponent implements OnInit {

  data:any;
  svgData: any;

  constructor(private stateService: StateService, private httpClient: HttpClient, private sanitizer: DomSanitizer) {

   }

  ngOnInit() {
    this.data = this.stateService.data;
    this.svgData = this.sanitizer.bypassSecurityTrustUrl("data:image/svg+xml;base64," + this.data.svg)
  }
}
