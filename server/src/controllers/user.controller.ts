import { Post, Route, Tags, Body } from 'tsoa';
import { CustomError } from '../errors/custom.error';
import { User } from '../models/user';
    
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { setCurrentUser } from '../services/user.service';

@Route("user")
@Tags("User")
export default class UserController {
  /** 
   * Sets a new current user 
   * @param newUser Data of the new current user 
   */
  @Post()
  public async postUser(@Body() body: User): Promise<void> {
    const newUser = plainToClass(User, body);
    const validationErrors = await validate(newUser);

    if(validationErrors.length > 0) {
      throw new CustomError(400, `User data is not valid! ${validationErrors.map(ve => ve.toString(false, false, "", true)).join(" ")}`);
    }

    setCurrentUser(newUser);
  }
}