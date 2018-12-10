import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { User } from '.././entities/user';

@Pipe({name: 'filterUsers'})
@Injectable({
    providedIn: 'root'
})

export class FilterUsers implements PipeTransform {
     
    transform(users: User[], args: string): any {
        if(users){
            return users.filter( function (user) {
                let fullName = user.firstName.toLowerCase()+" "+user.lastName.toLowerCase(); 
                return  user.firstName.toLowerCase().includes(args.toLowerCase()) || 
                        user.lastName.toLowerCase().includes(args.toLowerCase()) || 
                        fullName.includes(args.toLowerCase()) ||
                        user.location.toLowerCase().includes(args.toLowerCase()) 
            })
        } else {
            return [];
        }

    }
}
