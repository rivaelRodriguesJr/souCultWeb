export interface EventCategory {
  id: number;
  name: string;
}

export const eventCategories: EventCategory[] = [
  { id: 1, name: 'Teatro' },
  { id: 2, name: 'Musical' },
  { id: 3, name: 'Show', },
  { id: 4, name: 'Esporte', },
  { id: 5, name: 'Visual', },
  { id: 6, name: 'Outros', }
];

export interface EventCategoriesRequest  {
  result: EventCategory[]
}
