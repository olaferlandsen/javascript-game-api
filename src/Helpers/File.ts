import {XmlHttp} from "./XmlHttp";
import {Observable} from "rxjs/index";

export class File {
    public static  read (path:string):Observable<any> {
        return XmlHttp.get(path)
    }
}
