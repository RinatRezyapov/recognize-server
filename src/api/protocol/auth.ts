import ProtocolCommand from './ProtocolCommand';

export class SignInCommand extends ProtocolCommand {
  constructor(email: string, password: string, token: string) {
    super('Auth', 'SignIn', {email, password, token})
  }
}
