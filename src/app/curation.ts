import {SmallPlace} from "./small-place"

export interface Curation {
  id : string,
  rank : number,
  title : string,
  list_of_places : [SmallPlace]
}
