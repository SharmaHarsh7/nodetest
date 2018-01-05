import { IServiceBase } from "./../framework/service/base/IServiceBase";
import { IApplicationModel, ApplicationModel } from "./../data/models/ApplicationModel";
import { ServiceBase } from "./../framework/service/base/ServiceBase";
import { ApplicationSchema } from "./../data/schema/ApplicationSchema";
import { RepositoryBase } from "./../framework/repository/base/RepositoryBase";


interface IApplicationService extends IServiceBase<IApplicationModel> {

}

class ApplicationService extends ServiceBase<IApplicationModel> implements IApplicationService {

    constructor() {
        super(ApplicationSchema);
    }
}

Object.seal(ApplicationService);

export { ApplicationService };
