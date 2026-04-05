import { type Option } from "types/dropdown";

export const NAMES_OF_SORTING_COLUMNS: Option[] = [
    {value: 'По новизне (сначала новые)', key: 'createdAt-desc'},
    {value: 'По новизне (сначала старые)', key: 'createdAt-asc'},
    {value: 'По названию (Я → А)', key: 'title-desc'},
    {value: 'По названию (А → Я)', key: 'title-asc'},
]
