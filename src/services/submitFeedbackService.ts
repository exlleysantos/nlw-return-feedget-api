/* eslint-disable @typescript-eslint/naming-convention */
import { MailAdapter } from "../adapters/MailAdapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}
export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required");
    }
    if (!comment) {
      throw new Error("Cype is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid Image Format");
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: "New Feedback",
      body: [
        `<p>Seu Feedback de ${type} foi enviado<p>`,
        `<p>comentário : ${comment}`,
      ].join("\n"),
    });
  }
}
