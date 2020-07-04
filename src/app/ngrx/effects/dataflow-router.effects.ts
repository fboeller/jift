import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { filter, map, switchMap } from 'rxjs/operators';
import { loadDataflow, saveDataflow } from '../dataflow.actions';
import { HttpClient } from '@angular/common/http';
import { DataFlow } from 'src/app/types/data-flow.type';

@Injectable()
export class DataflowRouterEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  route$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((action: RouterNavigationAction) =>
        action.payload.routerState.url.startsWith('/dataflow')
      ),
      map((action) => action.payload.routerState.root.firstChild.params['id']),
      map((id) => loadDataflow({ id }))
    )
  );

  loadDataflow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDataflow),
      switchMap((action) =>
        this.http
          .get(`/assets/dataflows/${action.id}.json`)
          .pipe(map((dataflow: DataFlow) => saveDataflow({ dataflow })))
      )
    )
  );
}