/* eslint-disable @typescript-eslint/no-empty-function */
import { SubmitFeedbackService } from "./submitFeedbackService";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedbacl = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendEmailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedbacl.execute({
        type: "BUG",
        comment: "example",
        screenshot: "data:image/png;base64.example.jpeg",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(sendEmailSpy).toBeCalled();
  });

  it("should not be able to submit a feedback without a type", async () => {
    await expect(
      submitFeedbacl.execute({
        type: "",
        comment: "example",
        screenshot: "example.jpeg",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without a comment", async () => {
    await expect(
      submitFeedbacl.execute({
        type: "BUG",
        comment: "",
        screenshot: "example.jpeg",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback witha invalid screnshot", async () => {
    await expect(
      submitFeedbacl.execute({
        type: "BUG",
        comment: "commentx example",
        screenshot: "example.jpeg",
      })
    ).rejects.toThrow();
  });
});
