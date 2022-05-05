/* eslint-disable @typescript-eslint/naming-convention */

export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}
export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}
