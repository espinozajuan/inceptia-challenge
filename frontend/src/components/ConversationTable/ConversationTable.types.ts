export interface Case {
  id: number;
  bot: { id: number; name: string; alias: string };
  case_uuid: string;
  phone: number;
  first_name: string;
  last_name: string;
  case_result: {
    result_id: number;
    name: string;
    is_final: boolean;
    contacted: boolean;
  };
  case_duration: string;
  case_log: {
    responses: { text: string; time: number; confidence: number }[];
    result_id: number;
    commitment: string;
    got_promise: boolean;
    transcription: { text: string; time: number; confidence: number }[];
    final_sip_code: number;
  };
  extra_metadata: { dni: string; grupo: string; orden: string };
  recording: string;
  is_complete: boolean;
  status: string;
  last_updated: string;
  is_active: boolean;
}

export interface ConversationTableProps {
  clientId: number;
  fromDate: string;
  toDate: string;
  statusFilter: string;
  searchTerm: string;
}
