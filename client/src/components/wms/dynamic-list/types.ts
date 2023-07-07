export interface options {
  content: string;
  path: string;
}

export interface dynamicListProps {
  queryFn: any;
  optionsFn: (data: any[]) => options[];
}
