import BaseService from './base.service';

class MeasurementService extends BaseService {

    service: any = null;

    constructor() {
        super();
        this.service = this.client.service("measurements");
    }

}

export default new MeasurementService();

