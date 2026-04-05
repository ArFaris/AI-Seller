export type Option = {
    value: string;
    key: string;
}

export type DropdownProps<T extends Option[] | Option | null> = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Выбранное поле */
  value: T;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: T) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опция не выбрана, строка должна отображаться как placeholder. */
  getTitle: (value: T) => string;
};
