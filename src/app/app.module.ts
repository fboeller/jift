import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { DataflowDefinitionComponent } from './components/dataflow-definition/dataflow-definition.component';
import { HttpRequestComponent } from './components/http-request/http-request.component';

import { reducer } from './ngrx/dataflow.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DataFlowExecutionEffects } from './ngrx/effects/dataflow-execution.effects';
import { StepComponent } from './components/step/step.component';
import { HttpStatusBadgeComponent } from './components/http-status-badge/http-status-badge.component';
import { HttpRequestDetailComponent } from './components/http-request-detail/http-request-detail.component';
import { HttpRequestDetailPageComponent } from './components/http-request-detail-page/http-request-detail-page.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DataflowSelectionComponent } from './components/dataflow-selection/dataflow-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    DataflowDefinitionComponent,
    HttpRequestComponent,
    StepComponent,
    HttpStatusBadgeComponent,
    HttpRequestDetailComponent,
    HttpRequestDetailPageComponent,
    DataflowSelectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ dataflow: reducer }),
    EffectsModule.forRoot([DataFlowExecutionEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
