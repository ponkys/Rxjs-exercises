import {Component} from 'angular2/core';

import {ControlGroup, FormBuilder} from 'angular2/common';
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
    selector: 'my-app',
    template: `
        <form [ngFormModel]="form">
            <input type="text" ngControl="search">
        </form>
    `
})
export class AppComponent {
    form: ControlGroup;

    constructor(fb: FormBuilder){
        this.form = fb.group({
            search: []
        });

        var search = this.form.find('search');
        search.valueChanges
            .debounceTime(400)
            .map(str => (<string>str).replace(' ', '-'))
            .subscribe(x => console.log(x));

        var startDates = [];
        var startDate = new Date();

        for (var day = -2; day <= 2; day++){
            var date = new Date (
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate() + day);
                startDates.push(date);
            };
        Observable
            .fromArray(startDates)
            .map(date => {
                console.log("getting deals for date" +" "+ date);
                return [1, 2, 3];
                })
            .subscribe(x => console.log(x));

        var observable = [1,2,"another example"]; 
        Observable.fromArray(observable)
        console.log(observable);

        var x = Observable
        .range(1,5)
        x.subscribe(x => console.log(x));

        var y = Observable
        .empty()
        y.subscribe(y => console.log(y));

        var z = Observable
        .fromArray([1,2,3])
        z.subscribe(z => console.log(z));

    var a = Observable
        .of([1,2,3])
        a.subscribe(a => console.log(a));

        // Timer example, uncomment to make it work !!!

        // var timer = Observable.interval(1000); 
        // timer
        // .map (diez => {
        //         diez*10;
        //         return diez*10;
        //         })
        // .subscribe(timer => console.log(timer));

        // Muy chevere para llamar al servidor cada cierto intervalo y traer nueva informacion!!!

        // var newseg = Observable.interval(3000); 
        // newseg
        // .flatMap(x=>{
        //     console.log("callingtheservertogetthelatestnews");
        //     return Observable.of([1,2,3]);
        // })
        // .subscribe(news=>console.log(news));

        // Para unir dos llamados que estan en distintos arrays!!!  forkjoin!

        var userStream= Observable
        .of({userId:1,username:'mosh'})
        // to simulate a connection
        .delay(2000);

        var tweetsStream= Observable
        .of([1,2,3])
        // to simulate a connection
        .delay(1500);

        Observable
        .forkJoin(userStream,tweetsStream)
        .map(
            joined => new Object({user: joined[0], tweets: joined[1] })
        ) 
        .subscribe(
            result => console.log(result), 
            error => console.error(error)
        );

        // Fallback to handle errors!!! Important!!! in subscribe console.log!!!
        var errorTest= Observable
        .throw(
            new Error("Somethingfailed.")
        );

        errorTest
        .subscribe(
            x => console.log(x),
            error => console.error(error)
        );
        // retrying!!!

        // method .retry(#ofTimes) eg: .retry(3)  or .retry() (Leave blank for infinite retries)

        var counter = 0; 
        var ajaxCall = Observable
        .of('url') 
        .flatMap(() => { 
            if (++counter < 4) 
            return Observable
                .throw (new Error("Request failed"));
            return Observable.of(["ajax call", 2, 3]); 
        });

        ajaxCall
        .retry(3)
        .subscribe(
            ajaxLog => console.log(ajaxLog), 
            error => console.error(error) 
        );

        //Catch and continuing  If the service provider fails it gets date from local storage

        var remoteDataStream =  
        Observable
        .throw(new Error("Something failed."));
        remoteDataStream 
        .catch(
            err => { 
                var localDataStream = Observable.of(["local storage data", 2, 3]);
                return localDataStream; 
            }) 
        .subscribe(x => console.log(x));  

        // TimeOuts!!! if the service doesnt respond in a slow fashion we can set time outs to dont let our users waiting 

        var remoteSlowDataStream =
        Observable
        .of(["remoteSlowDataStreamExampleTimeouts",2,3])
        .delay(7000)
        ; 

        remoteSlowDataStream
        .timeout(6000) // error present due to delay of 7000 and timeoput of 6000
        .subscribe(
            timeout => console.log(timeout),
            error => console.error(error)
        ); 

        // getting notified when the observable completes

         var notification1 = Observable
        //.throw(new Error("error"));
        .fromArray(["Notification",2,3]);

        notification1
        .subscribe(
            notificationCompleted => console.log(notificationCompleted),
            error => console.log(error),
            () => console.log("completed") //notifies when observable process is completed and  successful
        );

    } 
}