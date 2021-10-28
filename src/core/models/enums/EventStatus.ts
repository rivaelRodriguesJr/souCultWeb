export enum EventStatus {
  ATIVO = 1,
  ESGOTADO = 2,
  CANCELADO = 3,
}

export const EventStatusLabel = new Map<EventStatus, string>([
  [EventStatus.ATIVO, "Ativo"],
  [EventStatus.ESGOTADO, "Esgotado"],
  [EventStatus.CANCELADO, "Cancelado"],
]);

export type EventStatusModel = { 
  id: number; 
  name: string;
};

const getEventStatusList = (): EventStatusModel[] => {
  const list: EventStatusModel[] = [];

  EventStatusLabel.forEach((value, key) => {
    list.push({ id: key, name: value });
  });

  return list;
};

export const EventStatusList = getEventStatusList();
