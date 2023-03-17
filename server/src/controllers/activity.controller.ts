import { Get, Route, Tags } from 'tsoa';
import { ActivityDto } from '../models/activity.dto';
import { fetchActivity } from '../services/activity.service';
import { getCurrentUser } from '../services/user.service';

@Route("activity")
@Tags("Activity")
export default class ActivityController {
  /** 
   * Gets new random activity, based on current user preferences if a user was set
   */
  @Get()
  public async getActivity(): Promise<ActivityDto> {
    const currentUser = getCurrentUser();
    const randomActivity = await fetchActivity(currentUser);

    return new ActivityDto(randomActivity);
  }
}