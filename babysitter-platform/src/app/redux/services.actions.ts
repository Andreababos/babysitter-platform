import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { User } from '../entities/user';
import { ServicesService } from '../services/services.service';
import { Service } from '../entities/service';


@Injectable({
    providedIn: 'root'
})

export class ServicesActions {

constructor (
  private ngRedux: NgRedux<IAppState>,
  private servicesService: ServicesService
) {} 
  
    static GET_SERVICES: string = 'GET_SERVICES'; 
    static START_SPINNER: string = 'START_SPINNER'; 
    static FAILURE: string = 'FAILURE';
    static CREATE_SERVICE: string = 'CREATE_SERVICE';
    static UPDATE_SERVICE: string = 'UPDATE_SERVICE';
    static DELETE_SERVICE: string = 'DELETE_SERVICE';


    getServices(){
        this.ngRedux.dispatch({
            type: ServicesActions.GET_SERVICES,
            payload: []
        } as any)
    }

    createService(service: Service):void {
        //start the spinner
        this.ngRedux.dispatch({
            type: ServicesActions.START_SPINNER
        } as any )
        this.servicesService.addService(service).subscribe( result =>{
            this.ngRedux.dispatch({
                type: ServicesActions.CREATE_SERVICE,
                payload: service
            } as any )
        }, error =>{
            this.ngRedux.dispatch({
                type: ServicesActions.FAILURE,
                payload: error
            } as any )
        })
        
    }

    updateService(service:Service): void{
        //start the spinner
        this.ngRedux.dispatch({
            type: ServicesActions.START_SPINNER
        } as any )
        this.servicesService.updateService(service).subscribe( result =>{
            this.ngRedux.dispatch({
                type: ServicesActions.UPDATE_SERVICE,
                payload: service
            } as any)
        }, error =>{
            this.ngRedux.dispatch({
                type: ServicesActions.FAILURE,
                payload: error
            } as any )
        })
    }

    deleteService(serviceId:string): void{
        this.ngRedux.dispatch({
            type: ServicesActions.START_SPINNER
        } as any )
        this.servicesService.deleteService(serviceId).subscribe( result =>{
            this.ngRedux.dispatch({
                type: ServicesActions.DELETE_SERVICE,
                payload: serviceId
            } as any )
        }, error =>{
            this.ngRedux.dispatch({
                type: ServicesActions.FAILURE,
                payload: error
            } as any )
        })
    }
}
