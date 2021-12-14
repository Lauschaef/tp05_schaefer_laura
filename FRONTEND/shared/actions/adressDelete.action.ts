export class DeleteAdress {
  static readonly type = '[string] Delete';

  constructor(public adress: string) {}
}