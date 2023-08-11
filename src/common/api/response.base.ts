import { IdResponse } from './id.response.dto';

export interface BaseResponseProps {
  id: string;
}

export class ResponseBase extends IdResponse {
  constructor(props: BaseResponseProps) {
    super(props.id);
  }
}
