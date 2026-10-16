export const PASSWORD = 'secret_sauce';

export interface LoginCase {
  title: string;
  user: string;
  pass: string;
  error: string;
}

/** Negative login scenarios driven from one table (data-driven testing). */
export const invalidLogins: LoginCase[] = [
  { title: 'locked out user', user: 'locked_out_user', pass: PASSWORD, error: 'locked out' },
  { title: 'wrong password', user: 'standard_user', pass: 'wrong', error: 'do not match' },
  { title: 'empty username', user: '', pass: PASSWORD, error: 'Username is required' },
  { title: 'empty password', user: 'standard_user', pass: '', error: 'Password is required' },
];

export const sortCases = [
  { option: 'lohi', label: 'price low→high', key: 'price', dir: 1 },
  { option: 'hilo', label: 'price high→low', key: 'price', dir: -1 },
  { option: 'az', label: 'name A→Z', key: 'name', dir: 1 },
  { option: 'za', label: 'name Z→A', key: 'name', dir: -1 },
] as const;
