/**
 * Класс работы с REST API
 */
class RequestSender {
    /**
     * 
     * @param {string} method 'POST' | 'GET' | 'PUT' | 'DEL'
     * @param {string} url линк на API
     * @param {object} data object с данными, отправляется методом 'POST'
     * 
     */
    constructor(method, url, data = null) {
        return new Promise((resolve, reject) => {
            this.xhr = new XMLHttpRequest();
            this.xhr.open(method, url);
            this.xhr.responseType = 'text';
            this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
            this.xhr.onload = () => {
                if (this.xhr.status >= 400) {
                    reject(this.xhr.response);
                } else {
                    resolve(this.xhr.response);
                }
            }
            this.xhr.onerror = () => {
                reject(this.xhr.response);
            }
            this.xhr.send(JSON.stringify(data));
        });
    }
}
