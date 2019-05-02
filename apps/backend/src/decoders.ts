import * as IO from 'io-ts';

export const NumberFromString = new IO.Type<number, string, unknown>(
  'NumberFromString',
  IO.number.is,
  (u, c) =>
    IO.string.validate(u, c).chain(s => {
      const n = Number(s);
      return isNaN(n) ? IO.failure(u, c) : IO.success(n);
    }),
  String,
);

export const DateFromString = new IO.Type<Date, string, unknown>(
  'DateFromString',
  (u): u is Date => u instanceof Date,
  (u, c) =>
    IO.string.validate(u, c).chain(s => {
      const d = new Date(s);
      return isNaN(d.getTime()) ? IO.failure(u, c) : IO.success(d);
    }),
  a => a.toISOString(),
);

export const UsernameCodec = new IO.Type<string, string, unknown>(
  'Username',
  IO.string.is,
  (u, c) =>
    IO.string.validate(u, c).chain(s => {
      return s.length < 3 ? IO.failure(u, c) : IO.success(s);
    }),
  String,
);

export const PasswordCodec = new IO.Type<string, string, unknown>(
  'Password',
  IO.string.is,
  (u, c) =>
    IO.string.validate(u, c).chain(s => {
      return s.length < 6 ? IO.failure(u, c) : IO.success(s);
    }),
  String,
);

export const HasIdCodec = IO.type({
  id: NumberFromString,
});
export type HasId = IO.TypeOf<typeof HasIdCodec>;
