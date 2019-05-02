import * as IO from 'io-ts';
import { UsernameCodec, PasswordCodec } from '../../decoders';

export const AuthCredentialsCodec = IO.type({
  username: UsernameCodec,
  password: PasswordCodec
});
export type AuthCredentials = IO.TypeOf<typeof AuthCredentialsCodec>;
