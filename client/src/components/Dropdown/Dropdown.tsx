import React from 'react';
import Input from '../Input';
import Text from 'components/Text'
import s from './Dropdown.module.scss';
import cn from 'classnames';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { type Option, type DropdownProps} from 'types/dropdown';

const Dropdown: React.FC<DropdownProps<Option | null>> = ({
    className, 
    options, 
    value, 
    onChange, 
    disabled, 
    getTitle,
}: DropdownProps<Option | null>) => {

    const wrapperRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLInputElement>(null);
    const [filter, setFilter] = useState('');
    const [isOpened, setIsOpened] = useState(false);

    const open = () => {
        setIsOpened(true);
    }

    useEffect(() => {
        const handlerClick = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
                setIsOpened(false);
            }
        }

        window.addEventListener('click', handlerClick);

        return () => {
            window.removeEventListener('click', handlerClick);
        }
    }, []);

    useEffect(() => {
        if (!isOpened) {
             // eslint-disable-next-line react-hooks/set-state-in-effect
            setFilter('');
        }
    }, [isOpened]);

    const title = useMemo(() => getTitle(value), [getTitle, value]);

    const isEmpty = value === null;

    const filteredOptions = useMemo(() => {
        const str = filter.toLocaleLowerCase();

        return options.filter((o) => o.value.toLocaleLowerCase().indexOf(str) === 0);
    }, [filter, options]);

    const onSelect = useCallback(
        (option: Option) => {
            if (disabled) {
                return;
            }

            if (value?.key === option.key) {
                onChange(null);
            } else {
                onChange(option);
            }

            ref.current?.focus();
        },
        [disabled, onChange, value]
    );

     return (
        <div ref={wrapperRef} className={cn(s['dropdown'], className)}>
            <Input
                onClick={open}
                disabled={disabled}
                data-full={'true'}
                placeholder={title || 'Sort'}
                value={isOpened && !disabled ? filter : isEmpty ? '' : title}
                onChange={setFilter}
                afterSlot={<ArrowDownIcon color='totalBlack' className={cn(isOpened && s.rotate)} />}
                afterPosition={{ top: '7.38px', right: '16px'}}
                gray={true}
                multiGray={true}
            />
            {
                isOpened && !disabled && (
                    <div className={s['dropdown__options']}>
                        {filteredOptions.map((option) => (
                            <button
                                className={cn(
                                    s['dropdown__option'],
                                    (value?.key === option.key) && s['dropdown__option_selected']
                                )}
                                key={option.key}
                                onClick={() => {
                                    onSelect(option);
                                }}
                            >
                                <Text view="p-14">
                                    {option.value}
                                </Text>
                            </button>
                        ))}
                    </div>
                )
            }
        </div>
    );
}

export default Dropdown;
