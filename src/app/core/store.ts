import { BehaviorSubject, Observable } from "rxjs";

export class Store<T> {
    state$ : Observable<T>;
    private _state$ : BehaviorSubject<T>;

    protected constructor(initialState: T){
        this._state$ = new BehaviorSubject<T>(initialState);
        this.state$ = this._state$.asObservable()
    }

    // sync
    get state(){
        return this._state$.getValue();
    }

    protected setState(nexState: T): void {
        console.log('---------------------------');
        console.log('Previous State', this.state);

        this._state$.next(nexState);
        
        console.log('Current State', this.state);
        console.log('---------------------------');
    }
}