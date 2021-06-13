export enum UserType {
  COMPANY_ADMIN = 1,
  EVENT_ADMIN = 2,
  COLLABORATOR = 3
}

export const UserTypeMap = new Map<UserType, string>([
  [UserType.COMPANY_ADMIN, 'Administrador de Empresa'],
  [UserType.EVENT_ADMIN, 'Administrador de Evento'],
  [UserType.COLLABORATOR, 'Colaborador']
]);
