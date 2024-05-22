export interface Client {
  id: number;
  name: string;
}

export interface ClientSelectionProps {
  onSelectClient: (clientId: number) => void;
}
