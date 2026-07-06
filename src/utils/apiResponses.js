export class ApiResponses {
    constructor(data, message = 'success') {
        this.data = data;
        this.message = message;
    }
}