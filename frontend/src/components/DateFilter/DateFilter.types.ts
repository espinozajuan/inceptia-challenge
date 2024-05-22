export interface DateFilterProps {
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  onStatusFilterChange: (status: string) => void;
  onClearFilters: () => void;
  onSearchTermChange: (term: string) => void;
}
