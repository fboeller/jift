import { createAction, props } from '@ngrx/store';

import { Step } from '../types/step.type';
import { VariableMap } from '../types/variabe-map.type';

export const startExecution = createAction(
  '[Execution] Start',
  props<{ steps: Step[] }>()
);

export const finishExecution = createAction('[Execution] Finish');

export const startStepExecution = createAction(
  '[Execution] Start step',
  props<{ stepIndex: number; steps: Step[]; variables: VariableMap }>()
);

export const finishStepExecution = createAction(
  '[Execution] Finish step',
  props<{
    stepIndex: number;
    evaluation: any;
    steps: Step[];
    variables: VariableMap;
  }>()
);
