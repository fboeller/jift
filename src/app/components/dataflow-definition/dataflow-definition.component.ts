import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  resetExecution,
  saveDataflow,
  startExecution
} from 'src/app/ngrx/dataflow.actions';
import { GlobalState } from 'src/app/ngrx/dataflow.state';
import { DataflowFormService } from 'src/app/services/dataflow-form.service';

@Component({
  selector: 'app-dataflow-definition',
  templateUrl: './dataflow-definition.component.html',
})
export class DataflowDefinitionComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() execution: any;
  @Input() evaluations: any;

  get steps() {
    return this.formGroup.get('steps') as FormArray;
  }

  constructor(
    private store: Store<GlobalState>,
    private dataflowFormService: DataflowFormService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  execute() {
    this.store.dispatch(startExecution({ dataflow: this.formGroup.value }));
  }

  clearExecution() {
    this.store.dispatch(resetExecution());
  }

  editStep(stepIndex: number) {
    this.store.dispatch(saveDataflow({ dataflow: this.formGroup.value }));
    this.router.navigate(['step', stepIndex], { relativeTo: this.route });
  }

  removeStep(stepIndex: number) {
    this.steps.removeAt(stepIndex);
  }

  addStep() {
    this.steps.push(
      this.dataflowFormService.createStep({
        assignTo: 'my_variable',
        request: {
          method: 'GET',
          url: 'http://swapi.dev/api/planets/1/',
        },
      })
    );
  }
}
