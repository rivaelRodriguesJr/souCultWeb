export enum StateMockEnum {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO'
}

export interface StateMockModel {
  name: string;
  abbreviation: StateMockEnum;
}

export const stateMock: StateMockModel[] = [
  { name: 'Acre', abbreviation: StateMockEnum.AC },
  { name: 'Alagoas', abbreviation: StateMockEnum.AL },
  { name: 'Amapá', abbreviation: StateMockEnum.AP },
  { name: 'Amazonas', abbreviation: StateMockEnum.AM },
  { name: 'Bahia', abbreviation: StateMockEnum.BA },
  { name: 'Ceará', abbreviation: StateMockEnum.CE },
  { name: 'Distrito Federal', abbreviation: StateMockEnum.DF },
  { name: 'Espírito Santo', abbreviation: StateMockEnum.ES },
  { name: 'Goiás', abbreviation: StateMockEnum.GO },
  { name: 'Maranhão', abbreviation: StateMockEnum.MA },
  { name: 'Mato Grosso', abbreviation: StateMockEnum.MT },
  { name: 'Mato Grosso do Sul', abbreviation: StateMockEnum.MS },
  { name: 'Minas Gerais', abbreviation: StateMockEnum.MG },
  { name: 'Pará', abbreviation: StateMockEnum.PA },
  { name: 'Paraíba', abbreviation: StateMockEnum.PB },
  { name: 'Paraná', abbreviation: StateMockEnum.PR },
  { name: 'Pernambuco', abbreviation: StateMockEnum.PE },
  { name: 'Piauí', abbreviation: StateMockEnum.PI },
  { name: 'Rio de Janeiro', abbreviation: StateMockEnum.RJ },
  { name: 'Rio Grande do Norte', abbreviation: StateMockEnum.RN },
  { name: 'Rio Grande do Sul', abbreviation: StateMockEnum.RS },
  { name: 'Rondônia', abbreviation: StateMockEnum.RO },
  { name: 'Roraima', abbreviation: StateMockEnum.RR },
  { name: 'Santa Catarina', abbreviation: StateMockEnum.SC },
  { name: 'São Paulo', abbreviation: StateMockEnum.SP },
  { name: 'Sergipe', abbreviation: StateMockEnum.SE },
  { name: 'Tocantins', abbreviation: StateMockEnum.TO }
];
