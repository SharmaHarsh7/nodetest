import { IServiceBase } from "./../framework/service/base/IServiceBase";
import { IUserModel, UserModel } from "./../data/models/Users/UserModel";
import { ServiceBase } from "./../framework/service/base/ServiceBase";
import { UserSchema } from "./../data/schema/Users/UserSchema";
import { UserInfoVM } from "./../data/view-models/UserInfo";
import { RepositoryBase } from "./../framework/repository/base/RepositoryBase";
import { IRepositoryBase } from "./../framework/repository/base/IRepositoryBase";

interface IUserService extends IServiceBase<IUserModel> {
    GetCurrentUserInfo: (condition: Object, callback: (error: any, result: UserInfoVM) => void) => void;
}

class UserService extends ServiceBase<IUserModel> implements IUserService {

    constructor() {
        super(UserSchema);
    }

    userList(callback: (error: any, result: Array<IUserModel>) => void) {
        this.query().find({}).populate("applications").exec(function (err, res) {
            callback(err, res);
        });
    }

    public GetCurrentUserInfo(userName: string, callback: (error: any, result: UserInfoVM) => void) {
        this.findOne({ username: userName }, (err, res: IUserModel) => {

            const userInfo = new UserInfoVM();

            userInfo.FullName = res.firstName + " " + res.lastName;
            userInfo.UserName = res.username;

            callback(err, userInfo);
        });
    }

}

Object.seal(UserService);

export { UserService };
