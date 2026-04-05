import s from './ProductsPage.module.scss';
import React, { useEffect, useMemo, useState } from 'react';
import Text from 'components/Text'
import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import Filter from 'components/Filter';
import Card from 'components/Card';
import SearchIcon from 'components/icons/SearchIcon';
import cn from 'classnames';
import { useItems } from 'hooks/useItems';
import type { Item } from 'types/item';
import LoadingScreen from 'components/LoadingScreen';
import { useNavigate } from 'react-router';
import { CATEGORY_NAMES } from 'consts/categories';
import type { CategoryType } from 'types/category';
import { useDebounce } from 'hooks/useDebounce';
import { NAMES_OF_SORTING_COLUMNS } from 'consts/sort';
import { type Option } from 'types/dropdown';
import Pagination from 'components/Pagination';
import { useItemsRevision } from 'hooks/useItemsWithRevision';

const ProductsPage: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [columnForSorting, setColumnForSorting] = useState<Option | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
    const [onlyNeedsRevision, setOnlyNeedsRevision] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 10;

    const debounceSearch = useDebounce<string>(searchText);
    const debounceSort = useDebounce<Option | null>(columnForSorting, 200);
    const debounceFilter = useDebounce<Option[]>(selectedCategories, 200);

    const sortColumn = debounceSort?.key?.split('-')[0] || '';
    const sortDirection = debounceSort?.key?.split('-')[1] || '';

    const categories = debounceFilter.map(option => option.key).join(',');

    const pagesSkip = (page - 1) * limit;

    useEffect(() => {
        setPage(1);
    }, [debounceSearch, debounceSort, debounceFilter]);

    const { data, isLoading, error } = useItems({ q: debounceSearch, 
                                                  limit: limit, 
                                                  skip: pagesSkip, 
                                                  sortColumn: sortColumn, 
                                                  sortDirection: sortDirection,
                                                  categories: categories
                                                });
    const navigate = useNavigate();
    const { needsRevisionMap, isLoading: revLoading } = useItemsRevision(data?.items || []);

    const handleCardClick = (id: string) => {
        navigate(`/ads/${id}`);
    }

    const handleInputChange = (currentValue: string) => {
        setSearchText(currentValue);
    }

    const displayItems = useMemo(() => {
        if (!data?.items) return [];
        
        if (!onlyNeedsRevision) return data.items;
        
        return data.items.filter((item: Item) => 
            needsRevisionMap.get(item.id) === true
        );
    }, [data?.items, onlyNeedsRevision, needsRevisionMap]);

    if (isLoading || revLoading) return <LoadingScreen />
    if (error) return <div>Ошибка</div>
    return (
        <div className={cn(s.page, s.products)}>
            <header className={s.header}>
                <Text view='subtitle'>Мои объявления</Text>
                <Text view='p-18' color='secondary' weight='normal'>{`${data.total} объявления`}</Text>
            </header>

            <div className={s.actions}>
                <Input onChange={handleInputChange}
                       afterSlot={<SearchIcon/>} 
                       afterPosition={{ top: '9px', right: '12px'}} 
                       placeholder={'Найти объявление....'} 
                       value={searchText}
                        gray={true}
                />
                <Dropdown options={NAMES_OF_SORTING_COLUMNS} value={columnForSorting} onChange={(option) => setColumnForSorting(option)} getTitle={(option) => {return option?.value || ''}}/>
            </div>
            <main className={s.content}>
                <Filter selectedCategories={selectedCategories} 
                        setSelectedCategories={setSelectedCategories}
                        onlyNeedsRevision={onlyNeedsRevision}
                        setOnlyNeedsRevision={setOnlyNeedsRevision} />
                <div className={s.container}>
                    {
                        displayItems.map((item: Item) => <Card 
                            key={item.id}
                            title={item.title}
                            isUnfinished={needsRevisionMap.get(item.id) || false} 
                            image='/cover.png' 
                            contentSlot={`${item.price.toString()} ₽`} 
                            captionSlot={CATEGORY_NAMES[item.category as CategoryType]} 
                            onClick={() => handleCardClick(item.id)}/>)
                    }
                    <Pagination total={data.total}
                                currentPage={page}
                                setPage={setPage}
                                limit={10}
                    />
                </div>
            </main>
        </div>
    );
};

export default ProductsPage;
