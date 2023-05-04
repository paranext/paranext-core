import crypto from 'crypto';
import { createNonce } from '@node/utils/crypto-util';

/** For now this is just for extensions, but maybe we will want to expand this in the future */
export type ExecutionTokenType = 'extension';

/** Execution tokens can be passed into API calls to provide context about their identity */
export class ExecutionToken {
  public readonly type: ExecutionTokenType;
  public readonly name: string;
  public readonly nonce: string;

  constructor(tokenType: ExecutionTokenType, name: string) {
    if (!tokenType) throw new Error('token type must be defined');
    if (!name || name.length < 1) throw new Error('name must be a string of length > 0');

    this.type = tokenType;
    this.name = name;
    this.nonce = createNonce('hex');
    Object.freeze(this);
  }

  public getHash(): string {
    return crypto
      .createHash('sha256')
      .update(`${this.type}${this.name}${this.nonce}`)
      .digest('hex');
  }
}
