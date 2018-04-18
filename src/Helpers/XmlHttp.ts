import {Observable} from "rxjs/index";

export interface IXmlHttpHeaders {
    [key : string ]: string;
}


export interface IXmlHttp {
    method : string;
    uri : string;
    params : string;
    data : string|object;
    headers : IXmlHttpHeaders;
    async : boolean;
    onStatus : {[status : number ] : () => void };

}
export class XmlHttp {

    public static create (options:IXmlHttp):Observable<any> {
        return new Observable<any>((subscriber) => {
            let request = new XMLHttpRequest();
            request.open(options.method, options.uri, options.async);

            if (typeof options.headers === "object" && Object.keys(options.headers).length > 0) {
                for (let header in options.headers) request.setRequestHeader(header, options[header]);
            }
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    // on status
                    if (options.onStatus && request.status in options.onStatus) {
                        options.onStatus[request.status].apply(null, [
                            request.statusText,
                            request.responseText
                        ]);
                    }

                    if (request.status === 200 || request.status === 0 || (options.method === "post" && request.status === 201)) {
                        subscriber.next(request.responseText);
                        subscriber.complete();
                    }
                    else {
                        subscriber.error(request.responseText);
                        subscriber.complete();
                    }
                }

            };
            request.send();
        });
    }

    public static get (uri: string, headers?: IXmlHttpHeaders):Observable<any> {
        return XmlHttp.create(<IXmlHttp>{
            method : "GET",
            uri : uri,
            async: true,
            headers : headers
        });
    }
    public static delete (uri: string, headers?: IXmlHttpHeaders):Observable<any> {
        return XmlHttp.create(<IXmlHttp>{
            method : "DELETE",
            uri : uri,
            async: true,
            headers : headers
        });
    }
    public static post (uri : string, data ?: any, headers ?: IXmlHttpHeaders) {
        return XmlHttp.create(<IXmlHttp>{
            method : "POST",
            data :data,
            headers : headers,
            async : true
        })
    }
    public static put (uri : string, data ?: any, headers ?: IXmlHttpHeaders) {
        return XmlHttp.create(<IXmlHttp>{
            method : "PUT",
            data :data,
            headers : headers,
            async : true
        })
    }
}
