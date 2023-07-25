import { Channel } from '../../database/channel.entity';

describe('Channel', () => {
  it('should be defined', () => {
    expect(new Channel()).toBeDefined();
  });
});
