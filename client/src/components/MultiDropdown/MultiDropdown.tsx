import React from 'react';
import Text from 'components/Text'
import s from './MultiDropdown.module.scss';
import cn from 'classnames';
import { useState, useMemo, useCallback } from 'react';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import CheckBox from 'components/CheckBox';
import { type Option, type DropdownProps} from 'types/dropdown'

const MultiDropdown: React.FC<DropdownProps<Option[]>> = ({
    className, 
    options, 
    value, 
    onChange, 
    disabled, 
    getTitle
}: DropdownProps<Option[]>) => {

    const [isOpened, setIsOpened] = useState(false);

    const open = () => {
        setIsOpened(prev => !prev);
    };

    const title = useMemo(() => getTitle(value), [getTitle, value]);

    const selectedKeysSet = useMemo<Set<Option['key']>>(
        () =>
            new Set(value.map(({key}) => key)),
        [value]
    );

    const onSelect = useCallback(
        (option: Option) => {
            if (disabled) {
                return;
            }

            if (selectedKeysSet.has(option.key)) {
                onChange([...value].filter(({key}) => key !== option.key));
            } else {
                onChange([...value, option])
            }
        },
        [disabled, onChange, value, selectedKeysSet]
    );

    return (
        <div className={cn(s['multi-dropdown'], className)}>
            <div onClick={open} className={s['multi-dropdown__title']}>
                <Text view='p-14'>{title}</Text>
                <ArrowDownIcon width={12} height={12} color='totalBlack' className={cn(isOpened && s.rotate)}/>
            </div>
            {
                isOpened && !disabled && (
                    <div>
                        {options.map((option) => (
                            <div className={cn(s['multi-dropdown__option'],
                                selectedKeysSet.has(option.key) && s['multi-dropdown__option_selected']
                            )}>
                                <CheckBox onChange={() => {onSelect(option);}} 
                                          checked={selectedKeysSet.has(option.key)}
                                />
                                <div key={option.key}>
                                    <Text view="p-14">
                                        {option.value}
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}

export default MultiDropdown;
