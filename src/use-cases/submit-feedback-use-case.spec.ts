import { SubmitFeedBackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedBackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {

      await expect(submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64asnfiudhfiur',
      })).resolves.not.toThrow();

      expect(createFeedbackSpy).toHaveBeenCalled();
      expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without a type', async () => {

      await expect(submitFeedback.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64, asnfiudhfiur',
      })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without a comment', async () => {

      await expect(submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64, asnfiudhfiur',
      })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid screenshot', async () => {

      await expect(submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: '123',
      })).rejects.toThrow();
    });

});