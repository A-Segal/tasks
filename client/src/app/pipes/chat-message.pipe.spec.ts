import { ChatMessagePipe } from './chat-message.pipe';

describe('ChatMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new ChatMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
