import { Injectable } from '@angular/core';
import { dropRight, tail } from 'lodash/fp';

import { Evaluations, Path } from './execution-engine.service';
import { Evaluation } from './execution.service';

@Injectable({
  providedIn: 'root',
})
export class EvaluationResolvementService {
  constructor() {}

  resolveEvaluation(
    evaluations: Evaluation | Evaluations,
    path: Path
  ): Evaluation | Evaluations {
    if (path.length == 0) {
      return evaluations;
    } else {
      return this.resolveEvaluation(evaluations[path[0]], tail(path));
    }
  }

  addEvaluation(
    path: Path,
    evaluations: Evaluations,
    evaluation: Evaluation
  ): Evaluations {
    if (path.length == 0) {
      return evaluations.concat([evaluation]);
    }
    if (path[0] < evaluations.length - 1) {
      throw new Error(
        'Can not modify sub evaluations of other than the current or next evaluation'
      );
    }
    if (path.length == 1) {
      if (path[0] == evaluations.length) {
        return evaluations.concat([evaluation]);
      } else {
        // Current evaluation hold a sub scope before and will now hold the return of the subscope
        return dropRight(1)(evaluations).concat([evaluation]);
      }
    } else {
      return evaluations.concat([
        this.addEvaluation(
          tail(path),
          path[0] == evaluations.length - 1 ? evaluations[path[0]] : [],
          evaluation
        ),
      ]);
    }
  }
}
