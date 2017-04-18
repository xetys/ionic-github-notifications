
import {DateTime} from "ionic-angular";
import {User} from "../users/user.module";
/**
 * Created by david on 16.04.17.
 */

export interface Notification {
  id: string,
  unread: boolean,
  subject: Subject,
  updated_at: DateTime,
  repository: Repository,
  thread: Thread
}


export interface Subject {
  title: string,
  type: string,
  url: string
}

export interface Thread {
  number: string,
  state: string,
  body: string,
  title: string,
  user: User
}



export interface Repository {
  name: string,
  full_name: string,
  owner: User,
  url: string
}
