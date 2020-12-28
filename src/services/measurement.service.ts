import BaseService from './base.service';

class MeasurementService {

    client: any;
    measurementService: any = null;

    constructor() {
        this.client = new BaseService().client;
        this.measurementService = this.client.service("measurements");
    }

}

export default new MeasurementService();

