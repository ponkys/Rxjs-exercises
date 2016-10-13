System.register(['angular2/core', 'angular2/common', "rxjs/Rx", 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, Rx_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(fb) {
                    this.form = fb.group({
                        search: []
                    });
                    var search = this.form.find('search');
                    search.valueChanges
                        .debounceTime(400)
                        .map(function (str) { return str.replace(' ', '-'); })
                        .subscribe(function (x) { return console.log(x); });
                    var startDates = [];
                    var startDate = new Date();
                    for (var day = -2; day <= 2; day++) {
                        var date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + day);
                        startDates.push(date);
                    }
                    ;
                    Rx_1.Observable
                        .fromArray(startDates)
                        .map(function (date) {
                        console.log("getting deals for date" + " " + date);
                        return [1, 2, 3];
                    })
                        .subscribe(function (x) { return console.log(x); });
                    var observable = [1, 2, "another example"];
                    Rx_1.Observable.fromArray(observable);
                    console.log(observable);
                    var x = Rx_1.Observable
                        .range(1, 5);
                    x.subscribe(function (x) { return console.log(x); });
                    var y = Rx_1.Observable
                        .empty();
                    y.subscribe(function (y) { return console.log(y); });
                    var z = Rx_1.Observable
                        .fromArray([1, 2, 3]);
                    z.subscribe(function (z) { return console.log(z); });
                    var a = Rx_1.Observable
                        .of([1, 2, 3]);
                    a.subscribe(function (a) { return console.log(a); });
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
                    var userStream = Rx_1.Observable
                        .of({ userId: 1, username: 'mosh' })
                        .delay(2000);
                    var tweetsStream = Rx_1.Observable
                        .of([1, 2, 3])
                        .delay(1500);
                    Rx_1.Observable
                        .forkJoin(userStream, tweetsStream)
                        .map(function (joined) { return new Object({ user: joined[0], tweets: joined[1] }); })
                        .subscribe(function (result) { return console.log(result); }, function (error) { return console.error(error); });
                    // Fallback to handle errors!!! Important!!! in subscribe console.log!!!
                    var errorTest = Rx_1.Observable
                        .throw(new Error("Somethingfailed."));
                    errorTest
                        .subscribe(function (x) { return console.log(x); }, function (error) { return console.error(error); });
                    // retrying!!!
                    // method .retry(#ofTimes) eg: .retry(3)  or .retry() (Leave blank for infinite retries)
                    var counter = 0;
                    var ajaxCall = Rx_1.Observable
                        .of('url')
                        .flatMap(function () {
                        if (++counter < 4)
                            return Rx_1.Observable
                                .throw(new Error("Request failed"));
                        return Rx_1.Observable.of(["ajax call", 2, 3]);
                    });
                    ajaxCall
                        .retry(3)
                        .subscribe(function (ajaxLog) { return console.log(ajaxLog); }, function (error) { return console.error(error); });
                    //Catch and continuing  If the service provider fails it gets date from local storage
                    var remoteDataStream = Rx_1.Observable
                        .throw(new Error("Something failed."));
                    remoteDataStream
                        .catch(function (err) {
                        var localDataStream = Rx_1.Observable.of(["local storage data", 2, 3]);
                        return localDataStream;
                    })
                        .subscribe(function (x) { return console.log(x); });
                    // TimeOuts!!! if the service doesnt respond in a slow fashion we can set time outs to dont let our users waiting 
                    var remoteSlowDataStream = Rx_1.Observable
                        .of(["remoteSlowDataStreamExampleTimeouts", 2, 3])
                        .delay(7000);
                    remoteSlowDataStream
                        .timeout(6000) // error present due to delay of 7000 and timeoput of 6000
                        .subscribe(function (timeout) { return console.log(timeout); }, function (error) { return console.error(error); });
                    // getting notified when the observable completes
                    var notification1 = Rx_1.Observable
                        .fromArray(["Notification", 2, 3]);
                    notification1
                        .subscribe(function (notificationCompleted) { return console.log(notificationCompleted); }, function (error) { return console.log(error); }, function () { return console.log("completed"); } //notifies when observable process is completed and  successful
                     //notifies when observable process is completed and  successful
                    );
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <form [ngFormModel]=\"form\">\n            <input type=\"text\" ngControl=\"search\">\n        </form>\n    "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map